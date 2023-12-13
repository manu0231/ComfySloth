import Reviews from '../components/reviews'
import ReviewForm from '../components/ReviewForm'
import { useUserContext } from '../context/user_context'

const ReviewPage = () => {
  const { myUser } = useUserContext()
  return (
    <>
      <Reviews />
      {myUser ? <ReviewForm /> : null}
    </>
  )
}
export default ReviewPage
