import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppChat.css";

const WhatsAppChat = () => {

  const phoneNumber = "919111039274"; 
  // Replace with your WhatsApp number

  const message =
    "Hello TechSourceEdge, I want to know more about your services.";

  const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


  return (

    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-icon"
    >

      <FaWhatsapp />

    </a>

  );

};


export default WhatsAppChat;