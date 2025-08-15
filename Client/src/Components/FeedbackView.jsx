import React, { useState, useEffect } from 'react';
import { Star, User, Calendar, MessageSquare } from 'lucide-react';
import { getFeedbackByLocation, postFeedback } from '../Services/feedbackService';
import { toast } from 'react-toastify';

const FeedbackView = ({ locationId, userId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddFeedback, setShowAddFeedback] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    rating: 0,
    message: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Fetch feedbacks on component mount
  useEffect(() => {
    fetchFeedbacks();
  }, [locationId]);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await getFeedbackByLocation(locationId);
      setFeedbacks(data || []);
    } catch (error) {
      toast.error('Failed to fetch feedbacks:', error);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    
    if (newFeedback.rating === 0) {
      toast.warning('Please select a rating');
      return;
    }

    if (!newFeedback.message.trim()) {
      toast.warning('Please enter a message');
      return;
    }

    try {
      setSubmitting(true);
      const feedbackData = {
        locationId: parseInt(locationId),
        message: newFeedback.message.trim(),
        rating: newFeedback.rating
      };

      await postFeedback(userId, feedbackData);
      
      // Reset form
      setNewFeedback({ rating: 0, message: '' });
      setShowAddFeedback(false);
      
      // Refresh feedbacks
      await fetchFeedbacks();
      
      toast.success('Feedback submitted successfully!');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onStarClick = null, onStarHover = null) => {
    const stars = [];
    const displayRating = interactive ? (hoveredRating || newFeedback.rating) : rating;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={interactive ? 24 : 16}
          className={`${
            i <= displayRating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={interactive ? () => onStarClick(i) : undefined}
          onMouseEnter={interactive ? () => onStarHover(i) : undefined}
          onMouseLeave={interactive ? () => onStarHover(0) : undefined}
        />
      );
    }
    return stars;
  };

  const calculateAverageRating = () => {
    if (feedbacks.length === 0) return 0;
    const sum = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    return (sum / feedbacks.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    feedbacks.forEach(feedback => {
      distribution[feedback.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading feedbacks...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header with overall rating */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
         
            Customer Feedback
          </h2>
          <button
            onClick={() => setShowAddFeedback(!showAddFeedback)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {showAddFeedback ? 'Cancel' : 'Add Feedback'}
          </button>
        </div>

        {feedbacks.length > 0 && (
          <div className="flex items-center gap-6 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{calculateAverageRating()}</div>
              <div className="flex justify-center mb-1">
                {renderStars(Math.round(calculateAverageRating()))}
              </div>
              <div className="text-sm text-gray-600">{feedbacks.length} reviews</div>
            </div>
            
            {/* Rating distribution */}
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center gap-2 text-sm">
                  <span className="w-4">{rating}</span>
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${feedbacks.length > 0 ? (ratingDistribution[rating] / feedbacks.length) * 100 : 0}%`
                      }}
                    />
                  </div>
                  <span className="w-8 text-gray-600">{ratingDistribution[rating]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Feedback Form */}
      {showAddFeedback && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Your Feedback</h3>
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex items-center gap-1">
                {renderStars(
                  newFeedback.rating,
                  true,
                  (rating) => setNewFeedback(prev => ({ ...prev, rating })),
                  setHoveredRating
                )}
                <span className="ml-2 text-gray-600">
                  {newFeedback.rating > 0 && `${newFeedback.rating}/5`}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                value={newFeedback.message}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Share your experience..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={4}
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddFeedback(false);
                  setNewFeedback({ rating: 0, message: '' });
                  setHoveredRating(0);
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Feedback List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Customer Reviews ({feedbacks.length})
        </h3>
        
        {feedbacks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <MessageSquare className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-600">No feedback available yet.</p>
            <p className="text-sm text-gray-500 mt-1">Be the first to share your experience!</p>
          </div>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  {feedback.image && feedback.image !== 'string' ? (
                    <img
                      src={feedback.image}
                      alt={feedback.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="text-gray-600" size={20} />
                    </div>
                  )}
                </div>

                {/* Feedback Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{feedback.userName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {renderStars(feedback.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {feedback.rating}/5
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>Recent</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackView;