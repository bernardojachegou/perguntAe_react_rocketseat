import { useHistory, useParams, Link } from 'react-router-dom';
import logoImg from 'src/assets/images/newlogo.png';
import { Button } from 'src/components/Button';
import { RoomCode } from 'src/components/RoomCode';
import { Question } from 'src/components/Question';
import { useRoom } from 'src/hooks/useRoom';
import deleteImg from 'src/assets/images/delete.svg';
import checkImg from 'src/assets/images/check.svg';
import answerImg from 'src/assets/images/answer.svg';
import 'src/styles/room.scss';
import { database } from 'src/services/firebase';
import { toast } from 'react-hot-toast';
// import { useAuth } from 'src/hooks/useAuth';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleCloseRoom() {
    if (window.confirm('Tem certeza deseja encerrar essa sala?')) {
      await database.ref(`rooms/${roomId}`).update({
        closedAt: new Date(),
      });

      history.push('/');

      toast.success('A sala foi encerrada com sucesso!', {
        style: {
          color: '#fff',
          background: '#140c44',
        },
      });
    }
    return;
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      toast.success('A pergunta foi deletada!', {
        style: {
          color: '#fff',
          background: '#140c44',
        },
      });
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Link to="/">
            <img id="logo-image" src={logoImg} alt="LetMeAsk" />
          </Link>
          <div id="room-code-wrapper">
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleCloseRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Destacar pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
