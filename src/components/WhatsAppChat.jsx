import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppChat.css";

const WhatsAppChat = () => {

  const phoneNumber = "919111039274"; 
  // replace with your WhatsApp number
  // country code included, no + sign

  const message =
    "Hello TechSourceEdge, I want to know more about your services.";

  const whatsappURL = 
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-chat"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppChat;