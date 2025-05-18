import React, { useState } from 'react';
import { Calendar, User, Clock, Tag, Search, Filter } from 'lucide-react';

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Rural Education in India",
      excerpt: "Exploring how digital technology is transforming education accessibility in rural areas...",
      author: "Dr. Rajesh Kumar",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Education",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
    },
    {
      id: 2,
      title: "Success Stories: From Rural Schools to Top Universities",
      excerpt: "Inspiring stories of students who overcame educational barriers...",
      author: "Priya Sharma",
      date: "March 14, 2024",
      readTime: "8 min read",
      category: "Success Stories",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc"
    },
    {
      id: 3,
      title: "Effective Online Learning Strategies",
      excerpt: "Tips and techniques for maximizing your online learning experience...",
      author: "Amit Patel",
      date: "March 13, 2024",
      readTime: "6 min read",
      category: "Learning Tips",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8"
    }
  ];

  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Edubridge Blog</h1>
          <p className="text-xl text-gray-600">
            Insights, updates, and stories from the world of education
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="education">Education</option>
                <option value="success-stories">Success Stories</option>
                <option value="learning-tips">Learning Tips</option>
                <option value="technology">Technology</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
                  alt="Featured post"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  March 16, 2024
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  10 min read
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Transforming Education: The Digital Revolution in Rural India
                </h2>
                <p className="text-gray-600 mb-6">
                  An in-depth look at how digital technology is revolutionizing education in rural India, making quality learning accessible to all...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                      alt="Author"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="text-gray-900 font-medium">Dr. Rajesh Kumar</span>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.date}
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  {post.readTime}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  <span className="text-sm text-indigo-600">
                    <Tag className="w-4 h-4 inline mr-1" />
                    {post.category}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
            Load More Articles
          </button>
        </div>
      </div>
    </main>
  );
}

export default Blog;