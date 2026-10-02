// Portfolio Data - Editable through Admin Panel
let portfolioData = {
    profile: {
        name: "Goyanshi Mohanty",
        profession: "Data Analyst",
        bio: "Results-driven Data Analyst with experience in transforming complex datasets into actionable business insights.",
        description: "Proven expertise in statistical analysis, machine learning, and data visualization. Strong background in developing predictive models and interactive dashboards that drive strategic decision-making.",
        image: "image.jpg"
    },
    
    contact: {
        email: "goyanshimohanty@gmail.com",
        phone: "+91 6370227703",
        location: "India, Odisha, Bhubaneswar",
        social: {
            linkedin: "https://www.linkedin.com/in/goyanshi-mohanty",
            github: "https://github.com/goyanshi27",
            twitter: "https://twitter.com"
        }
    }
};

// Load data from localStorage if available
function loadData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        portfolioData = JSON.parse(savedData);
    }
    return portfolioData;
}

// Save data to localStorage
function saveData(data) {
    portfolioData = data;
    localStorage.setItem('portfolioData', JSON.stringify(data));
}

// Initialize data
loadData();
