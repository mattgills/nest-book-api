
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { User } from '../entities/user.entity';
const bcrypt = require('bcrypt');
  
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }
  
    listenTo() {
        return User;
    }
  
    async beforeInsert(event: InsertEvent<User>) {
        event.entity.password = await bcrypt.hash(event.entity.password, 10);
    }
}