export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly title?: string,
    public readonly completed?: boolean,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: {[key:string]: any} = {};
    returnObj.completed = this.completed;
    returnObj.completedAt = this.completedAt;

    if(this.title) returnObj.title = this.title;

    return returnObj;
  }

  static create(prop: {[key:string]: any}): [string?, UpdateTodoDto?]{
    const {id, title, completed, completedAt} = prop;
    const newCompleted = Boolean(completed);
    let newCompletedAt = completedAt;

    if(!id || isNaN(parseInt(id))){
      return ["Id is not a number", undefined];
    }

    if(title === ""){
      return ["Title cannot be an empty string", undefined];
    }

    if(newCompleted && completedAt){
      newCompletedAt = new Date(completedAt);
      if(newCompletedAt.toString() === "Invalid Date"){
        return ["CompletedAt is not a valid date", undefined];
      }
    } 
    
    if(newCompleted && !completedAt){
      newCompletedAt = new Date();
    }

    if(!newCompleted){
      newCompletedAt = null;
    }

    return[undefined, new UpdateTodoDto(id, title, newCompleted, newCompletedAt)];
  }
}
