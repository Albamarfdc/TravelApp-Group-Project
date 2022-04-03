import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailId} from '../actions/index'
import { useSelector,useDispatch} from 'react-redux';
import Carousel from './Carousel';


function Details (){
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state)=>state.detail);
  

  useEffect(() => {
    dispatch(getDetailId(id));
  }, [dispatch, id]);
 
  

  return (

    <div>
      <h3>{detail.title}</h3>
      <Carousel />
      <h3>{detail.location} </h3>
      <h3>{detail.city}</h3>
      <h3>{detail.description}</h3>

        {detail.included?.map((i,id) => (
          <div key={id}>
            <h4>{i.body}</h4>
            </div>
        ))}
      <h3>{detail.score}</h3>
      <h3>{detail.stock}</h3>
      <h3>$ {detail.price}</h3>
      {detail.comments?.map((c,id) => (
        <li key={id}>
          <br/>
          {c}</li> 
          ))}
    </div>

    )
};
  export default Details;