import { Id } from './id';

export abstract class Entity<Props> {
  private _id: Id;
  protected props: Props;

  get id() {
    return this._id;
  }

  constructor(props: Props, id?: Id) {
    this._id = id ?? Id.create();
    this.props = props;
  }
}
