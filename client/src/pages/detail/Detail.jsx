import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { DetailContainer, DeatilBottomSection } from './Detail.styled'
import QuestionSection from '../../components/question/question-section/QuestionSection'
import InputSection from '../../components/question/input-section/InputSection'
import CommentSection from '../../components/question/comment-section/CommentSection'
import RecommentSection from '../../components/question/recomment-section/RecommentSection'
export default function Detail() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [datas, setDatas] = useState({});
  const [answers, setAnswers] = useState([]);

  useEffect(()=>{
    let UID = JSON.parse(localStorage.getItem('UID'));
    if(UID === null) UID = 1;

    axios(`http://ec2-13-125-172-34.ap-northeast-2.compute.amazonaws.com:8080/questions/get/${questionId}/${UID}`)
      .then(res => {
        setDatas(res.data);
        setAnswers(res.data.answers);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        navigate('/*');
      });
  }, [])
  return (
    <DetailContainer>
      <QuestionSection title={datas.title} content={datas.detail} tags={datas.tags} createdAt={datas.createdAt} questionId={datas.questionId} memberId={datas.memberId} votesCount={datas.votesCount}/>
      <InputSection questionId={datas.questionId}/>

      <DeatilBottomSection>
        {
          answers.map((answer, idx) => {
            return(
              <div key={idx} className='flex flex-col gap-5'>
                <CommentSection key={answer.answerId} comment={answer.detail} answerId={answer.answerId} memberId={answer.memberId}/>
                {
                  answer.comments.map(recomment => <RecommentSection key={recomment.commentId} commentDetail={recomment.commentDetail}/>)
                }
              </div>
            )
          })
        }
      </DeatilBottomSection>
    </DetailContainer>
  )
}