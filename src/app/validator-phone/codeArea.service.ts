import { Injectable, QueryList } from '@angular/core';
import { CodeArea } from './codeArea.model';
import { CodeAreaBlock } from './codeAreaBlok.var';
import { CodeAreaNew } from './codeAreaNew.var';
import { BlockArea } from './blockArea.model';
import { all } from './json.var';

const REGEXP = /;/;
const SPACE = /\s/g;

@Injectable()
export class CodeAreaService {

  private codesAreasArg = new Array<CodeArea>();

  constructor() {
    this.codesArea();
    setTimeout(() => {
      this.bloques();
    }, 1000);
    setTimeout(() => {
      this.json();
    }, 60000);
  }

  private codesArea() {
    let code = new CodeArea();
    let index = 0;
    let colum = 1;
    for (let i = 0; i < CodeAreaNew.cadena.length; i = i + 1) {
      if (REGEXP.test(CodeAreaNew.cadena[i])) {
        const aux = i - index;
        switch (colum) {
          case 1: {
            code.code = CodeAreaNew.cadena.substr(aux, index).replace(/\s/g, '');
            colum = 2;
            break;
          }
          case 2: {
            code.state = CodeAreaNew.cadena.substr(aux, index);
            colum = 3;
            break;
          }
          case 3: {
            code.description = CodeAreaNew.cadena.substr(aux, index);
            colum = 1;
            break;
          }
        }
        index = 0;
      } else {
        index = index + 1;
      }
      if (code.code && code.state && code.description) {
        this.codesAreasArg.push(code);
        code = new CodeArea();
      }
    }
  }

  public prueba(): any[] {
    let index = 0;
    let colum = 1;
    let codeAreaBlock = {
      codeArea: '',
      block: ''
    };
    const list = [];
    for (let i = 0; i < CodeAreaBlock.length; i = i + 1) {
      if (SPACE.test(CodeAreaBlock[i])) {
        const aux = i - index;
        switch (colum) {
          case 1: {
            codeAreaBlock.codeArea = CodeAreaBlock.substr(aux, index).replace(/\s/g, '');
            colum = 2;
            break;
          }
          case 2: {
            codeAreaBlock.block = CodeAreaBlock.substr(aux, index);
            colum = 1;
            break;
          }
        }
        index = 0;
      } else {
        index = index + 1;
      }
      if (codeAreaBlock.codeArea && codeAreaBlock.block) {
        list.push(codeAreaBlock);
        codeAreaBlock = {
          codeArea: '',
          block: ''
        };
      }
    }
    return list;
  }

  public bloques() {
    let blockAux = new BlockArea();
    this.codesAreasArg.forEach((codeArea) => {
      this.prueba().forEach((block) => {
        if (codeArea.code === block.codeArea) {
          blockAux.block = block.block;
          blockAux.codeAreaAndBlock = block.codeArea + block.block;
          codeArea.blocks.push(blockAux);
          blockAux = new BlockArea();
        }
      });
    });
    console.log(this.codesAreasArg);
  }

  public json() {
    let jsonCodeArea = {};
    this.codesAreasArg.forEach((item) => {
      item.blocks.forEach((block) => {
        jsonCodeArea[item.code + block.block] = true;
      });
    });
    console.log(jsonCodeArea[3]);
    console.log(jsonCodeArea[35]);
    console.log(jsonCodeArea[352]);
    console.log(jsonCodeArea[3525]);
    console.log(jsonCodeArea[35256]);
    console.log(jsonCodeArea[352561]);
    console.log(jsonCodeArea[3525615]);
    console.log(jsonCodeArea[35256159]);
    console.log(jsonCodeArea[352561590]);
    console.log(jsonCodeArea[3525615908]);
  }

  // public subStringPhone(value: string) {
  //   if (value) {
  //     return null;
  //   }
  //   const numberPhone = {
  //     codeArea: '',
  //     number: '',
  //     description: '',
  //     state: '',
  //     mask: ''
  //   };
  //   this.prueba().forEach((item) => {
  //     // tslint:disable-next-line: prefer-for-of
  //     for (let ii = 0; ii < item.block.length; ii = ii + 1) {
  //       if (item.block[ii].codeAreaAndBlock !== '' && value.indexOf(item.block[ii].codeAreaAndBlock) === 0) {
  //         numberPhone.codeArea = item.codeArea;
  //         numberPhone.description = item.description;
  //         numberPhone.state = item.state;
  //         numberPhone.number = value.substr(item.codeArea.length, value.length).replace(/\s/g, '');
  //         break;
  //       }
  //     }
  //   });
  //   switch (numberPhone.codeArea.length) {
  //     case 2: {
  //       numberPhone.mask = '00 00000000';
  //       break;
  //     }
  //     case 3: {
  //       numberPhone.mask = '000 0000000';
  //       break;
  //     }
  //     case 4: {
  //       numberPhone.mask = '0000 000000';
  //       break;
  //     }
  //   }
  //   return numberPhone.codeArea ? numberPhone : {
  //     codeArea: '',
  //     number: '',
  //     description: '',
  //     state: '',
  //     mask: ''
  //   };
  // }
}
