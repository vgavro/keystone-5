import { importView } from '@keystonejs/build-field-types';
import { Block } from '../Block';
import { paragraph } from '../blocks';

export default class HeadingBlock3 extends Block {
  get type() {
    return 'h4';
  }
  getAdminViews() {
    return [importView('../views/editor/blocks/h4'), ...new paragraph().getAdminViews()];
  }
}
