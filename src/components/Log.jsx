export default function Log({gameDetails}){
return(

   <ol id ='log'>
       {gameDetails.map((detail) => (<li key = {`${detail.row}${detail.col}`}>
        {detail.player} Selected {detail.row},{detail.col}
       </li>))}
   </ol>
)
}