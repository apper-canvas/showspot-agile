import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Sample data
const movieData = {
  id: "mov-123",
  title: "Dune: Part Two",
  genre: "Sci-Fi/Adventure",
  duration: "156 minutes",
  rating: "PG-13",
  director: "Denis Villeneuve",
  releaseDate: "March 1, 2024",
  description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
  poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
  cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
  languages: ["English", "Spanish", "Hindi"],
  formats: ["2D", "3D", "IMAX"],
};

const theaters = [
  { id: "th1", name: "CineStar Multiplex", location: "Downtown", distance: "2.5 miles", showTimes: ["10:30 AM", "1:15 PM", "4:00 PM", "7:45 PM", "10:30 PM"] },
  { id: "th2", name: "PVR Cinema", location: "Westfield Mall", distance: "3.8 miles", showTimes: ["11:00 AM", "2:30 PM", "5:15 PM", "8:00 PM", "11:15 PM"] },
  { id: "th3", name: "INOX Cinemas", location: "City Center", distance: "1.2 miles", showTimes: ["9:45 AM", "12:30 PM", "3:45 PM", "6:30 PM", "9:15 PM"] },
];

const seatMap = [
  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
  ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
  ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
];

// Seats already booked
const bookedSeats = ["A3", "A4", "B5", "B6", "B7", "C2", "C9", "D1", "D2", "E5", "E6", "E7", "F8", "F9"];

export default function MainFeature() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(movieData);
  const [ticketCount, setTicketCount] = useState(1);
  const [dates, setDates] = useState([]);
  
  // Declare all icons used in the component
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const ClockIcon = getIcon('Clock');
  const FilmIcon = getIcon('Film');
  const CheckIcon = getIcon('Check');
  const InfoIcon = getIcon('Info');
  const ArrowRightIcon = getIcon('ArrowRight');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const VideoIcon = getIcon('Video');
  const CreditCardIcon = getIcon('CreditCard');
  const ThumbsUpIcon = getIcon('ThumbsUp');
  const TicketIcon = getIcon('Ticket');
  const StarIcon = getIcon('Star');
  const PlusIcon = getIcon('Plus');
  const MinusIcon = getIcon('Minus');
  
  // Generate upcoming dates for booking
  useEffect(() => {
    const nextSevenDays = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      nextSevenDays.push({
        date: date.toISOString().split('T')[0], // YYYY-MM-DD
        day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
        dayNum: date.getDate(),
        month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
      });
    }
    
    setDates(nextSevenDays);
    setSelectedDate(nextSevenDays[0].date);
  }, []);
  
  // Calculate total amount when selected seats or ticket count changes
  useEffect(() => {
    // Base price per ticket: $12
    // Premium seats (rows A, B): +$4
    // IMAX format: +$5
    // 3D format: +$3
    
    let seatPricing = selectedSeats.map(seat => {
      let price = 12; // Base price
      
      // Premium rows
      if (seat.startsWith('A') || seat.startsWith('B')) {
        price += 4;
      }
      
      // Format premium
      if (selectedFormat === "IMAX") {
        price += 5;
      } else if (selectedFormat === "3D") {
        price += 3;
      }
      
      return price;
    });
    
    setTotalAmount(seatPricing.reduce((sum, price) => sum + price, 0));
  }, [selectedSeats, selectedFormat]);
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  const handleTheaterSelect = (theater) => {
    setSelectedTheater(theater);
    setSelectedShowtime(""); // Reset showtime when theater changes
  };
  
  const handleShowtimeSelect = (time) => {
    setSelectedShowtime(time);
  };
  
  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
  };
  
  const handleSeatSelect = (seat) => {
    if (bookedSeats.includes(seat)) {
      return; // Can't select already booked seats
    }
    
    setSelectedSeats(prev => {
      if (prev.includes(seat)) {
        return prev.filter(s => s !== seat);
      } else {
        // Only allow selecting as many seats as the ticket count
        if (prev.length < ticketCount) {
          return [...prev, seat];
        } else {
          toast.warning(`You can only select ${ticketCount} seats. Deselect a seat first.`);
          return prev;
        }
      }
    });
  };
  
  const incrementTicketCount = () => {
    setTicketCount(prev => prev + 1);
  };
  
  const decrementTicketCount = () => {
    setTicketCount(prev => prev > 1 ? prev - 1 : 1);
    
    // If reducing tickets, remove excess selected seats
    if (selectedSeats.length > ticketCount - 1 && ticketCount > 1) {
      setSelectedSeats(prev => prev.slice(0, ticketCount - 1));
    }
  };
  
  const handleContinue = () => {
    // Validation before proceeding
    if (currentStep === 1) {
      if (!selectedDate || !selectedTheater || !selectedShowtime || !selectedFormat) {
        toast.error("Please select all required booking details");
        return;
      }
    } else if (currentStep === 2) {
      if (selectedSeats.length !== ticketCount) {
        toast.error(`Please select exactly ${ticketCount} seats`);
        return;
      }
    }
    
    // Proceed to next step
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      
      // Simulate scrolling to top of the booking section
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Handle final submission
      toast.success("Tickets booked successfully! Check your email for confirmation.", {
        icon: "🎉"
      });
      
      // Reset form after successful booking
      setTimeout(() => {
        setCurrentStep(1);
        setSelectedSeats([]);
        setTicketCount(1);
      }, 2000);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const getSeatStatus = (seat) => {
    if (bookedSeats.includes(seat)) return 'booked';
    if (selectedSeats.includes(seat)) return 'selected';
    return 'available';
  };
  
  return (
    <section id="booking-section" className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Book Tickets</h2>
        <p className="text-surface-500">Reserve your seats for the latest shows in just a few clicks</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700">
              <div className="aspect-[2/3] relative">
                <img 
                  src={selectedMovie.poster} 
                  alt={selectedMovie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-surface-900 font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <StarIcon size={16} />
                  <span>8.7/10</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{selectedMovie.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                  <span className="px-2 py-0.5 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 text-xs rounded-full">
                    {selectedMovie.genre}
                  </span>
                  <span className="px-2 py-0.5 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 text-xs rounded-full">
                    {selectedMovie.duration}
                  </span>
                  <span className="px-2 py-0.5 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 text-xs rounded-full">
                    {selectedMovie.rating}
                  </span>
                </div>
                <div className="text-sm text-surface-500 mb-4">
                  <p className="line-clamp-3">{selectedMovie.description}</p>
                </div>
                <button 
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-200 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                >
                  <VideoIcon size={18} />
                  <span>Watch Trailer</span>
                </button>
              </div>
            </div>
            
            {currentStep > 1 && (
              <div className="mt-4 bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700">
                <h4 className="font-semibold mb-2">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  {selectedTheater && (
                    <div className="flex justify-between">
                      <span className="text-surface-500">Theater:</span>
                      <span className="font-medium">{selectedTheater.name}</span>
                    </div>
                  )}
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span className="text-surface-500">Date:</span>
                      <span className="font-medium">
                        {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  )}
                  {selectedShowtime && (
                    <div className="flex justify-between">
                      <span className="text-surface-500">Time:</span>
                      <span className="font-medium">{selectedShowtime}</span>
                    </div>
                  )}
                  {selectedFormat && (
                    <div className="flex justify-between">
                      <span className="text-surface-500">Format:</span>
                      <span className="font-medium">{selectedFormat}</span>
                    </div>
                  )}
                  {ticketCount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-surface-500">Tickets:</span>
                      <span className="font-medium">{ticketCount}</span>
                    </div>
                  )}
                  {selectedSeats.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-surface-500">Seats:</span>
                      <span className="font-medium">{selectedSeats.join(', ')}</span>
                    </div>
                  )}
                  {totalAmount > 0 && (
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-semibold">Total:</span>
                      <span className="font-semibold text-primary">${totalAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Booking Steps */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700 overflow-hidden">
            {/* Stepper */}
            <div className="flex border-b border-surface-200 dark:border-surface-700">
              <div 
                className={`flex-1 text-center py-3 px-4 ${currentStep >= 1 ? 'text-primary font-medium' : 'text-surface-500'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    currentStep > 1 ? 'bg-primary-light text-white' : 
                    currentStep === 1 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                  }`}>
                    {currentStep > 1 ? <CheckIcon size={14} /> : 1}
                  </div>
                  <span className="hidden sm:inline">Select Show</span>
                </div>
              </div>
              
              <div 
                className={`flex-1 text-center py-3 px-4 ${currentStep >= 2 ? 'text-primary font-medium' : 'text-surface-500'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    currentStep > 2 ? 'bg-primary-light text-white' : 
                    currentStep === 2 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                  }`}>
                    {currentStep > 2 ? <CheckIcon size={14} /> : 2}
                  </div>
                  <span className="hidden sm:inline">Select Seats</span>
                </div>
              </div>
              
              <div 
                className={`flex-1 text-center py-3 px-4 ${currentStep === 3 ? 'text-primary font-medium' : 'text-surface-500'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    currentStep === 3 ? 'bg-primary text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                  }`}>
                    3
                  </div>
                  <span className="hidden sm:inline">Payment</span>
                </div>
              </div>
            </div>
            
            {/* Step Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-6">Select Show Details</h3>
                    
                    {/* Date Selection */}
                    <div className="mb-6">
                      <label className="block text-surface-600 dark:text-surface-300 font-medium mb-2">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon size={18} />
                          <span>Date</span>
                        </div>
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {dates.map((date) => (
                          <button
                            key={date.date}
                            className={`p-3 rounded-lg border ${
                              selectedDate === date.date
                                ? 'bg-primary border-primary text-white'
                                : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary-light'
                            } flex flex-col items-center transition-colors`}
                            onClick={() => handleDateSelect(date.date)}
                          >
                            <span className="text-xs uppercase">{date.day}</span>
                            <span className="text-lg font-bold mt-1">{date.dayNum}</span>
                            <span className="text-xs">{date.month}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Theater Selection */}
                    <div className="mb-6">
                      <label className="block text-surface-600 dark:text-surface-300 font-medium mb-2">
                        <div className="flex items-center gap-1.5">
                          <MapPinIcon size={18} />
                          <span>Theater</span>
                        </div>
                      </label>
                      <div className="space-y-3">
                        {theaters.map((theater) => (
                          <button
                            key={theater.id}
                            className={`w-full p-3 rounded-lg border ${
                              selectedTheater?.id === theater.id
                                ? 'bg-primary/10 border-primary dark:bg-primary/20'
                                : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary-light'
                            } flex justify-between items-center transition-colors`}
                            onClick={() => handleTheaterSelect(theater)}
                          >
                            <div className="text-left">
                              <h4 className="font-semibold">{theater.name}</h4>
                              <p className="text-sm text-surface-500">{theater.location} • {theater.distance}</p>
                            </div>
                            {selectedTheater?.id === theater.id ? (
                              <CheckIcon size={20} className="text-primary" />
                            ) : (
                              <InfoIcon size={18} className="text-surface-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Showtime Selection */}
                    {selectedTheater && (
                      <div className="mb-6">
                        <label className="block text-surface-600 dark:text-surface-300 font-medium mb-2">
                          <div className="flex items-center gap-1.5">
                            <ClockIcon size={18} />
                            <span>Showtime</span>
                          </div>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedTheater.showTimes.map((time) => (
                            <button
                              key={time}
                              className={`px-4 py-2 rounded-lg border ${
                                selectedShowtime === time
                                  ? 'bg-primary text-white border-primary'
                                  : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary-light'
                              } transition-colors`}
                              onClick={() => handleShowtimeSelect(time)}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Format Selection */}
                    <div className="mb-8">
                      <label className="block text-surface-600 dark:text-surface-300 font-medium mb-2">
                        <div className="flex items-center gap-1.5">
                          <FilmIcon size={18} />
                          <span>Format</span>
                        </div>
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {movieData.formats.map((format) => (
                          <button
                            key={format}
                            className={`px-5 py-2 rounded-lg ${
                              selectedFormat === format
                                ? 'bg-primary text-white'
                                : 'bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary-light'
                            } transition-colors`}
                            onClick={() => handleFormatSelect(format)}
                          >
                            {format}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-6">Select Seats</h3>
                    
                    {/* Ticket Counter */}
                    <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-surface-50 dark:bg-surface-700">
                      <div>
                        <label className="font-medium">Number of Tickets</label>
                        <p className="text-sm text-surface-500">Select how many tickets you need</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={decrementTicketCount}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-200 dark:bg-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-500 transition-colors"
                          disabled={ticketCount <= 1}
                        >
                          <MinusIcon size={16} />
                        </button>
                        <span className="font-semibold text-lg w-6 text-center">{ticketCount}</span>
                        <button 
                          onClick={incrementTicketCount}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-200 dark:bg-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-500 transition-colors"
                          disabled={ticketCount >= 10}
                        >
                          <PlusIcon size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Seat Map */}
                    <div className="mb-8">
                      <div className="flex justify-center mb-2">
                        <div className="py-1 px-16 bg-surface-200 dark:bg-surface-700 rounded-lg text-center text-sm">
                          SCREEN
                        </div>
                      </div>
                      
                      <div className="flex justify-center my-6">
                        <div className="grid gap-y-4">
                          {seatMap.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex gap-x-2">
                              {row.map((seat) => {
                                const status = getSeatStatus(seat);
                                return (
                                  <button
                                    key={seat}
                                    className={`w-8 h-8 flex items-center justify-center text-xs rounded-md ${
                                      status === 'booked' 
                                        ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 dark:text-surface-500 cursor-not-allowed'
                                        : status === 'selected'
                                          ? 'bg-primary text-white'
                                          : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                                    }`}
                                    onClick={() => handleSeatSelect(seat)}
                                    disabled={status === 'booked'}
                                  >
                                    {seat}
                                  </button>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-surface-100 dark:bg-surface-800 rounded-sm"></div>
                          <span>Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-primary rounded-sm"></div>
                          <span>Selected</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-surface-200 dark:bg-surface-700 rounded-sm"></div>
                          <span>Booked</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Seat Info */}
                    <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-lg mb-8">
                      <h4 className="font-medium mb-2">Price Information</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Regular Seats (Rows C-F)</span>
                          <span className="font-medium">$12.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Premium Seats (Rows A-B)</span>
                          <span className="font-medium">$16.00</span>
                        </div>
                        {selectedFormat && (
                          <div className="flex justify-between">
                            <span>{selectedFormat} Surcharge</span>
                            <span className="font-medium">
                              {selectedFormat === 'IMAX' ? '+$5.00' : selectedFormat === '3D' ? '+$3.00' : '$0.00'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-6">Payment Details</h3>
                    
                    <div className="p-4 bg-surface-50 dark:bg-surface-700 rounded-lg mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-3 items-center">
                          <TicketIcon size={20} className="text-primary" />
                          <div>
                            <h4 className="font-semibold">Order Summary</h4>
                            <p className="text-sm text-surface-500">{selectedMovie.title}</p>
                          </div>
                        </div>
                        <span className="font-bold">${totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-surface-500">Tickets ({ticketCount}x)</span>
                          <span>${(totalAmount - 3.50).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-surface-500">Booking Fee</span>
                          <span>$3.50</span>
                        </div>
                        <div className="pt-2 mt-2 border-t border-surface-200 dark:border-surface-600 flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-primary">${(totalAmount + 3.50).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment Form */}
                    <div className="mb-8">
                      <h4 className="font-medium mb-4 flex items-center gap-2">
                        <CreditCardIcon size={18} />
                        <span>Card Details</span>
                      </h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name on Card</label>
                          <input 
                            type="text" 
                            className="input-field"
                            placeholder="John Smith"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Card Number</label>
                          <input 
                            type="text" 
                            className="input-field"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Expiry Date</label>
                            <input 
                              type="text" 
                              className="input-field"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">CVV</label>
                            <input 
                              type="text" 
                              className="input-field"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="terms"
                        className="w-4 h-4 text-primary focus:ring-primary rounded"
                      />
                      <label htmlFor="terms" className="ml-2 text-sm">
                        I agree to the <a href="#" className="text-primary">Terms and Conditions</a> and <a href="#" className="text-primary">Privacy Policy</a>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  className={`flex items-center gap-1 px-5 py-2.5 rounded-lg border border-surface-300 dark:border-surface-600 ${
                    currentStep === 1 
                      ? 'invisible' 
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                  onClick={handleBack}
                >
                  <ArrowLeftIcon size={18} />
                  <span>Back</span>
                </button>
                
                <button
                  className="flex items-center gap-1 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
                  onClick={handleContinue}
                >
                  <span>{currentStep === 3 ? 'Confirm Payment' : 'Continue'}</span>
                  {currentStep < 3 ? <ArrowRightIcon size={18} /> : <ThumbsUpIcon size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}