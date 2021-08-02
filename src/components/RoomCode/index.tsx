import toast from 'react-hot-toast';
import copyImg from 'src/assets/images/copy.svg';
import 'src/components/RoomCode/styles.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.success('Código da sala copiado!', {
      style: {
        color: '#fff',
        background: '#140c44',
      },
    });
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
