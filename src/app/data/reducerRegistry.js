export class ReducerRegistry {
  constructor() {
    this.emitChange = null;
    this.reducers = {};
  }

  getReducers() {
    return { ...this.reducers };
  }

  register(name, reducer) {
    this.reducers = { ...this.reducers, [name]: reducer };
    if (this.emitChange) {
      this.getReducers();
      this.emitChange(this.getReducers());  
    }
  }

  setChangeListener(listener) {
    this.emitChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();
export default reducerRegistry;
