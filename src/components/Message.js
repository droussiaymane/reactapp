import React from 'react'

const Message = ({color}) => {
  return (<>
    {color=='red' &&  <div
  class="flex items-center justify-between gap-4 p-4 text-red-700 border rounded border-red-900/10 bg-red-50"
  role="alert"
>
  <div class="flex items-center gap-4">
 

    <p>
      <strong class="text-sm font-medium"> Uh-oh! </strong>

      <span class="block text-xs opacity-90">
        Error ! Try again !!
      </span>
    </p>
  </div>

  <button class="opacity-90" type="button">
    <span class="sr-only"> Close </span>

   
  </button>
</div>}

{color=='green' && 
 <div
 class="flex items-center justify-between gap-4 p-4 text-green-700 border rounded border-green-900/10 bg-green-50"
 role="alert"
>
 <div class="flex items-center gap-4">


   <p>
     <strong class="text-sm font-medium"> Success </strong>

     <span class="block text-xs opacity-90">
       All is good !
     </span>
   </p>
 </div>

 <button class="opacity-90" type="button">
   <span class="sr-only"> Close </span>

  
 </button>
</div>
}
   
</> )
}

export default Message