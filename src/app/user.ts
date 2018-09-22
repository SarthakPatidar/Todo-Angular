export class user{
    name: String;
    id: number;
    todo: String;

    constructor(user_name,post_id,post){
        this.name = user_name;
        this.id = post_id;
        this.todo = post;
    }
}