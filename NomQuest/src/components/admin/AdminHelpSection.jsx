import React, { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const AdminHelpSection = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeAccordion, setActiveAccordion] = useState(null);

    const faqs = [
        { question: "How do I add a new store?", answer: "To add a new store, go to the Admin Stores section and click on 'Add Store'." },
        { question: "How do I edit a food item?", answer: "Go to the Admin Foods section, find the item you want to edit, and click the 'Edit' button." },
        { question: "How do I manage users?", answer: "Navigate to the Admin Users section where you can add, edit, or delete users." },
        { question: "How do I view analytics?", answer: "Analytics can be viewed on the Admin Dashboard. You can see store visits, food popularity, and more." },
    ];

    const filteredFaqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <div className="min-h-full bg-white text-center">
            <h1 className="text-2xl font-bold text-primary mb-6 text-center">Help</h1>
            
            {/* Search Bar */}
            <div className="mb-6 flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-accent">
                <SearchRoundedIcon className="ml-3 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search for help topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border-0 focus:outline-none"
                />
            </div>

            {/* Accordions */}
            <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                    <div key={index} className="border rounded-md">
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full text-left px-4 py-3 font-semibold hover:bg-gray-200 rounded-t-md flex justify-between items-center"
                        >
                            <span>{faq.question}</span>
                            <span>{activeAccordion === index ? "-" : "+"}</span>
                        </button>
                        {activeAccordion === index && (
                            <div className="p-4 bg-white text-gray-700 rounded-b-md">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
                
                {filteredFaqs.length === 0 && (
                    <p className="text-center text-gray-500">No results found for "{searchTerm}".</p>
                )}
            </div>
        </div>
    );
};

export default AdminHelpSection;