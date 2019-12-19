import { BlockArea } from './blockArea.model';

export class CodeArea {
  code: string;
  state: string;
  description: string;
  mask: string;
  blocks = new Array<BlockArea>();
}
