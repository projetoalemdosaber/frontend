import Tema from './Tema';
import Usuario from './Usuario';

export default interface Postagem {
  id: number;
  titulo: string;
  texto: string;
  foto: string;
  video: string;
  curtir: number;
  amei: number;
  indico: number;
  dataLancamento: string;
  tema: Tema | null;
  usuario: Usuario | null;
}