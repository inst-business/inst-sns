import PostCreate from './Post.Create'
import PostDetails from './Post.Details'
import PostEdit from './Post.Edit'

const Post = (() => {
  return {
    Create: PostCreate,
    Details: PostDetails,
    Edit: PostEdit,
  }
})()

export default Post