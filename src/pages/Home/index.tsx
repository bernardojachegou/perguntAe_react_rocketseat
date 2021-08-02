import { useHistory } from 'react-router-dom';
import illustrationImg from 'src/assets/images/illustration.svg';
import googleIconImg from 'src/assets/images/google-icon.svg';
import logoImg from 'src/assets/images/newlogo.png';
import { Button } from 'src/components/Button';
import { useAuth } from 'src/hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from 'src/services/firebase';
import toast from 'react-hot-toast';
import 'src/styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Está sala não existe!', {
        style: {
          color: '#fff',
          background: '#e21c44',
        },
      });
      return;
    }

    if (roomRef.val().closedAt) {
      toast.error('Está sala foi encerrada!', {
        style: {
          color: '#fff',
          background: '#e21c44',
        },
      });
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala "
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
