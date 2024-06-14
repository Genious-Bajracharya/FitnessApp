import { Twitter, Linkedin, Youtube } from "react-feather";
export default function Footer(){
    return(
        <footer className="bg-gray-900 text-white py-8">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    <div className="mb-4 md:mb-0">
      <img src="https://media.istockphoto.com/id/1331186720/vector/dumbbell.jpg?s=612x612&w=0&k=20&c=ztAKf6ZaSrWTBQVW7Nj2yrEbGM0FxitFrze39W-HdMs=" alt="Company Logo" className="h-10" />
    </div>
    <div className="flex space-x-4 mb-4 md:mb-0">
      <a href="/about-us" className="hover:underline">About Us</a>
      <a href="/contact" className="hover:underline">Contact</a>
      <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
    </div>
    <div className="flex space-x-4">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
        <Twitter  className="h-6" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
        <Linkedin className="h-6" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
        <Youtube className="h-6" />
      </a>
    </div>
  </div>
</footer>
    )
}