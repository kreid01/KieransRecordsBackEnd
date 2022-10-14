import React from 'react';
import { useParams, Link } from 'react-router-dom'


export default function Record(props) {
    const { id } = useParams()

    const similarRecordsUnique = props.recordData.filter((rec => rec.name!== props.recordData[id].name))

    const similarRecords = similarRecordsUnique.reduce((acc, record, i) => {     
        if(record !== props.recordData[id]) {
        if(record.genres.includes(
            props.recordData[id].genres[0] || 
            props.recordData[id].genres[1] || 
            props.recordData[id].genres[2])) {
          return acc.concat(record)
        }}
        return acc
    }, [])
  
    // eslint-disable-next-line array-callback-return
    const similarRecordsData = similarRecords.map((record, i) => {
        if (i < 6) {
        const id = props.recordData.indexOf(record)
        
        // eslint-disable-next-line no-unused-vars, array-callback-return
        return (
            <div className='record' id={id} key={id}>
                <Link to={`/records/${id}`}
                onClick={window.scrollTo(0, 0)}>
                <img className='record--image featured--record'                        
                src={record.imageUrl}
                alt=''
                />
                </Link>
                <div>
                    <h3 className='record--name'>{record.name}</h3>
                    <h3 className='record--artist'>{record.artist}</h3>
                </div>
                <div id='similar-record--info--container'>
                    <p className='record--info'>{record.releaseYear}  • {record.songCount} songs</p>
                    <div className='record--buying'>
                        <p className='record--price'>£{record.price}</p>
                        <button style={props.inputThemeStyles} onClick={() => props.addToCart(record, id)}>Add to Cart</button>
                    </div>
                </div>
            </div>
            )
            }
        })
       
        const currentRecordData =
            <div className='current--record' id={id} key={id}>
                <img className='current--record--image'                        
                src={props.recordData[id].imageUrl}
                alt='radiohead'
                />
                <div className='current--record--info'>
                    <h3 className='current--record--artist'>{props.recordData[id].artist}<div className='quantity--remaining'>{props.recordData[id].quantity} Left</div></h3>
                    <p className='current--record--details'>{props.recordData[id].releaseYear}  • {props.recordData[id].songCount} songs </p>
                    <div className='current--record-genres'>
                        {props.recordData[id].genres.join(', ')}
                    </div>
                    <p className='current--record--price'>£{props.recordData[id].price}</p>
                    <div className='current--record--buying'>
                        <button 
                        style={props.inputThemeStyles}
                        onClick={() => props.addToWishlist(props.recordData[id], id)}className='wishlist--add'>+ Wishlist</button>
                        <button 
                        style={props.inputThemeStyles}
                        onClick={() => props.addToCollection(props.recordData[id], id)}className='wishlist--add'>+ Collection</button>
                        <button 
                        style={props.inputThemeStyles}
                        onClick={() => props.addToCart(props.recordData[id], id)}>Add to Cart</button>
                    </div>
                </div>
            </div>
    return  (
        <>
        <div className='current--record--page' style={props.themeStyles}>
            <div className='current--record--header'>
                <h1 className='page--header'>{props.recordData[id].name}</h1>
            </div>
            <div className='current--record--container'>
             {currentRecordData}
         </div>
         </div>
         <section clssName='similar--record--container' style={props.themeStyles}>
            <h1 style={props.themeStyles} className='page--header'>Similar Records</h1>
            <div className='similar--records' style={props.themeStyles}>
                 {similarRecordsData}
            </div>
         </section>
        </>
    )
}