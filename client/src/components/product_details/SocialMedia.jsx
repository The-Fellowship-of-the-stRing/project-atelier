import React,{useState,useEffect} from 'react';
const SocialMedia = () => {
  const [URL, setURL] = useState("localhost:8080")
  return(

    <div className="g-socials">
     <a id="myLink">
     <script>
       console.log("script is firing")
       const myLink = document.getElementById("myLink");
       myLink.innerText = "Click me!";
       myLink.href = "http://google.com";
      </script>
      </a>

    </div>

  )
}
export default SocialMedia

// https://www.facebook.com/sharer/sharer.php?u=http://localhost:8080
// https://twitter.com/intent/tweet?url=http://localhost:3000&text=
// https://pinterest.com/pin/create/button/?url=http://localhost:3000&media=&description=

