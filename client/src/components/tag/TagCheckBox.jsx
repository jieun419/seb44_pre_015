import { useEffect, useState } from 'react';
import axios from 'axios';
import { TagCheckContainer, TagCheck, TagCheckBoxed, TagLabel } from "./TagCheckBox.styled"

export default function TagCheckBox({ handlerTag, tags, checkCount, accessToken }) {
  const [tagList, setTagList] = useState([])
  const tagsData = () => {
    axios
      .get('http://ec2-13-125-172-34.ap-northeast-2.compute.amazonaws.com:8080/questions/tags',
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        setTagList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    tagsData()
  }, [])

  return (
    <TagCheckContainer>
      {
        tagList.map((el) => (
          <TagCheckBoxed key={el.tagName}>
            <TagCheck
              type="checkbox"
              id={el.tagName}
              value={el.tagName}
              checked={tags.some(item => item.tagName === el.tagName)}
              disabled={!tags.some(item => item.tagName === el.tagName) && checkCount >= 3}
              onChange={() => handlerTag(el.tagName)}
            ></TagCheck>
            <TagLabel htmlFor={el.tagName}>
              <span>{el.tagName}</span>
            </TagLabel>
          </TagCheckBoxed>
        ))
      }
    </TagCheckContainer>
  )
}