import { importView } from '@keystonejs/build-field-types';
import { Block } from '../Block';
import { paragraph } from '../blocks';

export default class HeadingBlock2 extends Block {
  get type() {
    return 'h2';
  }
  getAdminViews() {
    return [importView('../views/editor/blocks/h2'), ...new paragraph().getAdminViews()];
  }
}
