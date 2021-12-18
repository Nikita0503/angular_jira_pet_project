import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../comments.service';

@Pipe({
  name: 'comments'
})
export class CommentsPipe implements PipeTransform {

  transform(value: Comment[], ...args: unknown[]): Comment[] {
    return value.sort((prevComment, nextComment) => {
      return new Date(nextComment.createdAt).getTime() - new Date(prevComment.createdAt).getTime()
    });
  }

}
