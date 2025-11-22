import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/pages/ui/button"
import { CheckCircle2, Sparkles, Calendar, Clock, Ticket,  QrCodeIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"


interface TicketData {
  title: string
  ticketId: string
  image: string
  location: string
  venue:string
  date: string
  time: string
  price: string
  paymentStatus: string
  ticketStatus: string

  createdTime: string
}

interface TicketBookingAnimationProps {
  ticketData: TicketData
}

export function TicketBookedAnimation({ ticketData }: TicketBookingAnimationProps) {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)
  const ticketRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true)
      setShowConfetti(true)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const onBackToEvent = () => {
    navigate("/events")
  }
  return (
    <>
     
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
        <div ref={ticketRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ticket-fly">
          {/* Motion blur trail */}
          <div className="absolute inset-0 blur-sm opacity-30 scale-105 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
          
          <div className="relative w-[420px] h-[200px] bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-2xl shadow-2xl overflow-hidden transform rotate-12 hover:rotate-0 transition-transform duration-500">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]"></div>
            </div>
            
            {/* Ticket content */}
            <div className="relative h-full flex">
              <div className="flex-1 p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Ticket className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest opacity-80">Admit One</span>
                </div>
                <h3 className="text-xl font-black mb-4 line-clamp-2 leading-tight">{ticketData.title}</h3>
                <div className="space-y-1 text-sm opacity-90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-semibold">{ticketData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">{ticketData.time}</span>
                  </div>
                </div>
              </div>
              
              {/* Perforated edge */}
              <div className="w-24 bg-white/10 backdrop-blur-sm border-l-2 border-dashed border-white/30 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Shine effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
          </div>
        </div>
      </div>

      {/* Confetti particles */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                backgroundColor: ['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}

      {/* Success Modal - Integrated Design */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="relative max-w-5xl w-full animate-modal-pop bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
            
            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-0 relative z-10">
              {/* LEFT SIDE - Ticket Details */}
              <div className="bg-white p-8 space-y-6">
                {/* Event Title */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{ticketData.title}</h2>
                  <p className="text-sm text-gray-600 mt-2">Ticket ID :   #EVT34232578653</p>
                </div>
                {/* Event Image */}
                <div className="relative rounded-lg overflow-hidden h-48 bg-gray-200">
                  <img
                    src={ticketData.image || "/placeholder.svg"}
                    alt="Event"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                    <p className="text-white text-bold font-medium">{ticketData.venue}</p>
                  </div>
                </div>
                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Date</p>
                      <p className="text-sm font-semibold text-gray-900">{ticketData.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Time</p>
                      <p className="text-sm font-semibold text-gray-900">{ticketData.time}</p>
                    </div>
                  </div>
                </div>
            
                {/* Divider */}
                <div className="border-t-2 border-dashed border-gray-300"></div>
                {/* Price and Payment Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Ticket Price</p>
                    <p className="text-2xl font-bold text-gray-900">{ticketData.price}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-semibold text-green-600">{ticketData.paymentStatus}</span>
                  </div>
                </div>
                {/* Back to Event Button */}
                <Button
                  onClick={onBackToEvent}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Back to Event
                </Button>
              </div>
              {/* RIGHT SIDE - QR Code Section */}
              <div className="bg-purple-600 p-8 flex flex-col items-center justify-center text-white space-y-6">
                {/* Header */}
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-wider opacity-90">{ticketData.title}</p>
                </div>
                {/* Date and Status */}
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold">{ticketData.date}</p>
                  <p className="text-sm opacity-90">Ticket Status: unused</p>
                </div>
                {/* QR Code Container */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <QrCodeIcon/>
                </div>
                {/* Scan Instructions */}
                <div className="text-center space-y-4">
                  <p className="text-sm font-medium">Scan this QR code at the event entrance</p>
                  <div className="text-xs opacity-75 space-y-1">
                    <p>Transaction ID: EVT650327943111</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes ticket-fly {
          0% {
            transform: translate(-200%, 200%) rotate(-45deg) scale(0.5);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) rotate(12deg) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(12deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes modal-pop {
          0% {
            transform: scale(0.8) translateY(20px);
            opacity: 0;
          }
          70% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-ticket-fly {
          animation: ticket-fly 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-modal-pop {
          animation: modal-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }

        .animate-confetti {
          animation: confetti ease-in forwards;
        }

        .animate-shine {
          animation: shine 3s infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </>
  )
}