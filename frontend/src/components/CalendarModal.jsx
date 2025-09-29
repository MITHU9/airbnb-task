import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarModal = ({
  isOpen,
  onClose,
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-40 mb-28">
      <div className="bg-white rounded-2xl shadow-2xl p-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Select check-in date</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-bold"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Add your travel dates for exact pricing
        </p>

        {/* Calendar */}
        <div className="flex flex-col gap-8">
          <DatePicker
            selected={checkIn}
            onChange={(dates) => {
              const [start, end] = dates;
              setCheckIn(start);
              setCheckOut(end);
            }}
            startDate={checkIn}
            endDate={checkOut}
            selectsRange
            inline
            monthsShown={1}
            calendarClassName="vertical-calendar"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              setCheckIn(null);
              setCheckOut(null);
            }}
            className="text-sm text-gray-600 hover:underline"
          >
            Clear dates
          </button>
          <button
            onClick={onClose}
            className="bg-black text-white px-6 py-2 rounded-lg font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
