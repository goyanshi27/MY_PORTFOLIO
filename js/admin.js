// ===== ADMIN PANEL JAVASCRIPT =====

// Initialize admin functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
    initializeDataManagement();
    initializeFormHandlers();
    initializeProjectManagement();
    initializeSkillsManagement();
});

// ===== ADMIN PANEL INITIALIZATION =====
function initializeAdminPanel() {
    // Check if user is authenticated (simple password protection)
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    
    if (isAuthenticated !== 'true') {
        // Show password prompt when admin button is clicked
        const adminToggle = document.getElementById('adminToggle');
        if (adminToggle) {
            adminToggle.addEventListener('click', function(e) {
                e.preventDefault();
                showAdminLogin();
            });
        }
    }
}

function showAdminLogin() {
    const password = prompt('Enter admin password:');
    
    if (password === 'admin123') { // Simple password - in production, use proper authentication
        localStorage.setItem('adminAuthenticated', 'true');
        openAdminPanel();
        loadAdminData();
    } else if (password !== null) {
        alert('Incorrect password. Access denied.');
    }
}

function openAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) {
        adminPanel.classList.add('active');
    }
}

// ===== DATA MANAGEMENT =====
function initializeDataManagement() {
    // Initialize data structure if not exists
    if (!PortfolioApp.storage.get('portfolioData')) {
        const defaultData = {
            general: {
                name: 'Goyanshi Mohanty',
                subtitle: 'Transforming Data into Insights',
                email: 'goyanshi@example.com',
                phone: '+1 (555) 123-4567',
                location: 'San Francisco, CA'
            },
            projects: [
                {
                    id: 1,
                    title: 'Sales Analytics Dashboard',
                    description: 'Interactive dashboard for real-time sales monitoring and trend analysis with predictive forecasting.',
                    category: 'analytics',
                    tools: ['Power BI', 'SQL', 'Python'],
                    image: 'https://via.placeholder.com/400x250/0d6efd/ffffff?text=Sales+Dashboard'
                },
                {
                    id: 2,
                    title: 'Customer Churn Prediction',
                    description: 'Machine learning model to predict customer churn with 89% accuracy using ensemble methods.',
                    category: 'ml',
                    tools: ['Python', 'TensorFlow', 'Scikit-learn'],
                    image: 'https://via.placeholder.com/400x250/198754/ffffff?text=Customer+Churn'
                },
                {
                    id: 3,
                    title: 'Data Visualization Suite',
                    description: 'Comprehensive visualization toolkit for creating interactive charts and graphs from complex datasets.',
                    category: 'visualization',
                    tools: ['Tableau', 'D3.js', 'R'],
                    image: 'https://via.placeholder.com/400x250/6f42c1/ffffff?Text=Data+Viz'
                }
            ],
            skills: [
                { name: 'Python', level: 90, category: 'programming' },
                { name: 'SQL', level: 85, category: 'database' },
                { name: 'Excel', level: 95, category: 'tools' },
                { name: 'Power BI', level: 88, category: 'visualization' },
                { name: 'Tableau', level: 82, category: 'visualization' },
                { name: 'Data Visualization', level: 87, category: 'visualization' }
            ]
        };
        
        PortfolioApp.storage.set('portfolioData', defaultData);
    }
}

function loadAdminData() {
    const data = PortfolioApp.storage.get('portfolioData');
    if (!data) return;
    
    // Load general information
    populateGeneralForm(data.general);
    
    // Load projects
    populateProjectsList(data.projects);
    
    // Load skills
    populateSkillsList(data.skills);
}

// ===== FORM HANDLERS =====
function initializeFormHandlers() {
    // General form handler
    const generalForm = document.getElementById('generalForm');
    if (generalForm) {
        generalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveGeneralData();
        });
    }
    
    // Skills form handler
    const skillsForm = document.getElementById('skillsForm');
    if (skillsForm) {
        skillsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSkillsData();
        });
    }
    
    // Add project button
    const addProjectBtn = document.getElementById('addProject');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            addNewProject();
        });
    }
}

// ===== GENERAL DATA MANAGEMENT =====
function populateGeneralForm(generalData) {
    const nameInput = document.getElementById('adminName');
    const subtitleInput = document.getElementById('adminSubtitle');
    
    if (nameInput) nameInput.value = generalData.name || '';
    if (subtitleInput) subtitleInput.value = generalData.subtitle || '';
}

function saveGeneralData() {
    const data = PortfolioApp.storage.get('portfolioData');
    if (!data) return;
    
    const nameInput = document.getElementById('adminName');
    const subtitleInput = document.getElementById('adminSubtitle');
    
    data.general.name = nameInput ? nameInput.value : data.general.name;
    data.general.subtitle = subtitleInput ? subtitleInput.value : data.general.subtitle;
    
    PortfolioApp.storage.set('portfolioData', data);
    
    // Update live website
    updateLiveWebsite(data);
    
    // Show success message
    showAdminMessage('General information updated successfully!', 'success');
}

// ===== PROJECTS MANAGEMENT =====
function populateProjectsList(projects) {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;
    
    projectsList.innerHTML = '';
    
    projects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsList.appendChild(projectElement);
    });
}

function createProjectElement(project) {
    const div = document.createElement('div');
    div.className = 'admin-project-item mb-3';
    div.innerHTML = `
        <div class="card bg-dark text-white">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <input type="text" class="form-control mb-2" placeholder="Project Title" 
                               value="${project.title}" data-field="title" data-id="${project.id}">
                        <textarea class="form-control mb-2" placeholder="Description" rows="2"
                                  data-field="description" data-id="${project.id}">${project.description}</textarea>
                        <select class="form-control mb-2" data-field="category" data-id="${project.id}">
                            <option value="analytics" ${project.category === 'analytics' ? 'selected' : ''}>Analytics</option>
                            <option value="ml" ${project.category === 'ml' ? 'selected' : ''}>Machine Learning</option>
                            <option value="visualization" ${project.category === 'visualization' ? 'selected' : ''}>Visualization</option>
                        </select>
                        <input type="text" class="form-control" placeholder="Tools (comma separated)" 
                               value="${project.tools.join(', ')}" data-field="tools" data-id="${project.id}">
                    </div>
                    <div class="col-md-4">
                        <input type="url" class="form-control mb-2" placeholder="Image URL" 
                               value="${project.image}" data-field="image" data-id="${project.id}">
                        <button class="btn btn-success btn-sm w-100 mb-2" onclick="saveProject(${project.id})">
                            <i class="fas fa-save"></i> Save
                        </button>
                        <button class="btn btn-danger btn-sm w-100" onclick="deleteProject(${project.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return div;
}

function addNewProject() {
    const data = PortfolioApp.storage.get('portfolioData');
    if (!data) return;
    
    const newProject = {
        id: Date.now(),
        title: 'New Project',
        description: 'Project description goes here...',
        category: 'analytics',
        tools: ['Python', 'SQL'],
        image: 'https://via.placeholder.com/400x250/0d6efd/ffffff?text=New+Project'
    };
    
    data.projects.push(newProject);
    PortfolioApp.storage.set('portfolioData', data);
    
    populateProjectsList(data.projects);
    showAdminMessage('New project added!', 'success');
}

function saveProject(projectId) {
    const data = PortfolioApp.storage.get('portfolioData');
    if (!data) return;
    
    const project = data.projects.find(p => p.id === projectId);
    if (!project) return;
    
    // Get all input fields for this project
    const fields = document.querySelectorAll(`[data-id="${projectId}"]`);
    
    fields.forEach(field => {
        const fieldName = field.getAttribute('data-field');
        let value = field.value;
        
        if (fieldName === 'tools') {
            value = value.split(',').map(tool => tool.trim()).filter(tool => tool);
        }
        
        project[fieldName] = value;
    });
    
    PortfolioApp.storage.set('portfolioData', data);
    updateLiveWebsite(data);
    showAdminMessage('Project updated successfully!', 'success');
}

function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const data = PortfolioApp.storage.get('portfolioData');
    if (!data) return;
    
    data.projects = data.projects.filter(p => p.id !== projectId);
    PortfolioApp.storage.set('portfolioData', data);
    
    populateProjectsList(data.projects);
    updateLiveWebsite(data);
    showAdminMessage('Project deleted successfully!', 'warning');
}

// ===== SKILLS MANAGEMENT =====
function populateSkillsList(skills) {
    const skillsList = document.getElementById('skillsList');
    if (!skillsList) return;
    
    skillsList.innerHTML = '';
    
    skills.forEach((skill, index) => {
        const skillElement = createSkillElement(skill, index);
        skillsList.appendChild(skillElement);
    });
}

function createSkillElement(skill, index) {
    const div = document.createElement('div');
    div.className = 'admin-skill-item mb-3';
    div.innerHTML = `
        <div class="card bg-dark text-white">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <input type="text" class="form-control mb-2" placeholder="Skill Name" 
                               value="${skill.name}" data-skill-index="${index}" data-field="name">
                    </div>
                    <div class="col-md-4">
                        <input type="number" class="form-control mb-2" placeholder="Level (0-100)" 
                               value="${skill.level}" min="0" max="100" 
                               data-skill-index="${index}" data-field="level">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-danger btn-sm w-100" onclick="deleteSkill(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return div;
}

function saveSkillsData() {
    const data = PortfolioApp.storage.get('portfolioData');
    if (!data) return;
    
    const updatedSkills = [];
    
    // Get all skill inputs
    const skillInputs = document.querySelectorAll('[data-skill-index]');
    const skillMap = {};
    
    skillInputs.forEach(input => {
        const index = parseInt(input.getAttribute('data-skill-index'));
        const field = input.getAttribute('data-field');
        
        if (!skillMap[index]) {
            skillMap[index] = {};
        }
        
        skillMap[index][field] = field === 'level' ? parseInt(input.value) : input.value;
    });
    
    // Convert map to array
    Object.keys(skillMap).forEach(index => {
        updatedSkills.push(skillMap[index]);
    });
    
    data.skills = updatedSkills;
    PortfolioApp.storage.set('portfolioData', data);
    
    updateLiveWebsite(data);
    showAdminMessage('Skills updated successfully!', 'success');
}

function deleteSkill(index) {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    const data = PortfolioApp.storage.get('portfolioData');
    if (!data) return;
    
    data.skills.splice(index, 1);
    PortfolioApp.storage.set('portfolioData', data);
    
    populateSkillsList(data.skills);
    updateLiveWebsite(data);
    showAdminMessage('Skill deleted successfully!', 'warning');
}

// ===== LIVE WEBSITE UPDATES =====
function updateLiveWebsite(data) {
    // Update hero section
    const typingText = document.getElementById('typingText');
    if (typingText && data.general) {
        // Update the first text in typing animation
        const originalText = typingText.textContent;
        if (originalText.includes('Hi, I\'m')) {
            typingText.textContent = `Hi, I'm ${data.general.name} — Data Analyst`;
        }
    }
    
    // Update subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && data.general) {
        heroSubtitle.textContent = data.general.subtitle;
    }
    
    // Update projects page
    updateProjectsDisplay(data.projects);
    
    // Update skills displays
    updateSkillsDisplay(data.skills);
}

function updateProjectsDisplay(projects) {
    // This would update the projects page dynamically
    // For now, we'll just store the data and let the page refresh show changes
    console.log('Projects updated:', projects);
}

function updateSkillsDisplay(skills) {
    // Update skill progress bars
    skills.forEach(skill => {
        const skillBars = document.querySelectorAll('.skill-progress, .skill-progress-animated');
        skillBars.forEach(bar => {
            const skillName = bar.closest('.skill-item, .skill-advanced')?.querySelector('.skill-header span')?.textContent;
            if (skillName && skillName.includes(skill.name)) {
                bar.setAttribute('data-skill', skill.level);
                bar.style.width = skill.level + '%';
                
                // Update percentage display
                const percentageDisplay = bar.closest('.skill-item, .skill-advanced')?.querySelector('.skill-percentage');
                if (percentageDisplay) {
                    percentageDisplay.textContent = skill.level + '%';
                }
            }
        });
    });
}

// ===== ADMIN MESSAGES =====
function showAdminMessage(message, type = 'info') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type} alert-dismissible fade show admin-message`;
    messageDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Find admin content area
    const adminContent = document.querySelector('.admin-content');
    if (adminContent) {
        adminContent.insertBefore(messageDiv, adminContent.firstChild);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }
}

// ===== EXPORT/IMPORT FUNCTIONALITY =====
function exportData() {
    const data = PortfolioApp.storage.get('portfolioData');
    if (!data) return;
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'portfolio-data.json';
    link.click();
}

function importData(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            PortfolioApp.storage.set('portfolioData', data);
            loadAdminData();
            updateLiveWebsite(data);
            showAdminMessage('Data imported successfully!', 'success');
        } catch (error) {
            showAdminMessage('Error importing data. Please check the file format.', 'danger');
        }
    };
    
    reader.readAsText(file);
}

// ===== LOGOUT FUNCTIONALITY =====
function logoutAdmin() {
    localStorage.removeItem('adminAuthenticated');
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) {
        adminPanel.classList.remove('active');
    }
    showAdminMessage('Logged out successfully', 'info');
}

// Export admin functions
window.AdminPanel = {
    saveProject,
    deleteProject,
    deleteSkill,
    exportData,
    importData,
    logoutAdmin
};
