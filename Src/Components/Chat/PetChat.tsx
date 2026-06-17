import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Message } from '../../types';

export const PetChat: React.FC = () => {
  const { activePet } = useGame();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'pet',
      text: activePet
        ? `Hi there! I'm ${activePet.name}. Thanks for taking care of me! What are we working on together today? ✨`
        : 'Adopt and hatch an egg from the Haven panel first so we can chat!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activePet) return;

    const playerMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'player',
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, playerMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let petReply = `*Happy noises* I love spending time with you! Let's complete more goals!`;

      if (activePet.hunger < 40) {
        petReply = `*Tummy rumbles* I'm getting a little hungry... Do you have any treats for me in your backpack? 🍎`;
      } else if (activePet.happiness < 50) {
        petReply = `*Yawns softly* I feel a bit lonely. Want to play a quick game or work on a hard task together?`;
      } else if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
        petReply = `Hello friend! ${activePet.name} is ready for action! What's next on our to-do list? 🚀`;
      } else if (input.toLowerCase().includes('study') || input.toLowerCase().includes('work') || input.toLowerCase().includes('task')) {
        petReply = `Ooh, deep focus mode! I'll sit right next to you while you crush this task! You got this! 💪`;
      }

      const petMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'pet',
        text: petReply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, petMessage]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="w-full flex flex-col h-[360px] p-1">
      <div className="text-center border-b border-orange-50/60 pb-2 mb-2">
        <h3 className="font-extrabold text-sm text-hh-text">
          {activePet ? `Chatting with ${activePet.name}` : 'Pet Companion Chat'}
        </h3>
        <p className="text-[10px] text-gray-400">
          {activePet ? `${activePet.emoji} Level ${activePet.level} ${activePet.type}` : 'No active pet discovered'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 mb-2 pr-1 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'player' ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                msg.sender === 'player'
                  ? 'bg-hh-primary text-white rounded-tr-none'
                  : 'bg-white border border-orange-50 text-hh-text rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && activePet && (
          <div className="flex items-center gap-1 bg-white border border-orange-50 px-3 py-2 rounded-2xl rounded-tl-none w-14 shadow-sm">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          disabled={!activePet}
          onChange={(e) => setInput(e.target.value)}
          placeholder={activePet ? `Message ${activePet.name}...` : 'Hatch a pet to unlock chat...'}
          className="flex-1 bg-white border border-orange-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-hh-primary/40 disabled:bg-gray-50 disabled:cursor-not-allowed text-hh-text"
        />
        <button
          type="submit"
          disabled={!input.trim() || !activePet}
          className={`px-3 font-bold rounded-xl text-xs transition-all ${
            input.trim() && activePet
              ? 'bg-hh-primary text-white active:scale-95 shadow-sm'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default PetChat;
