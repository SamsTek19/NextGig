// Applications page functionality - This will be initialized by the Firebase module script

async function loadApplications() {
    const applicationsList = document.getElementById('applications-list');
    
    if (!applicationsList) return;
    
    try {
        // Show loading state
        applicationsList.innerHTML = '<li class="application-item loading">Loading applications...</li>';
        
        // Get applications from localStorage
        const localApplications = getApplicationsFromLocalStorage();
        
        // Get applications from Firebase (if user is authenticated)
        let firebaseApplications = [];
        try {
            firebaseApplications = await getApplicationsFromFirebase();
        } catch (error) {
            console.log('Firebase not available or user not authenticated');
        }
        
        // Merge and deduplicate applications
        const allApplications = mergeApplications(localApplications, firebaseApplications);
        
        if (allApplications.length === 0) {
            applicationsList.innerHTML = `
                <li class="application-item empty-state">
                    <div class="empty-state-content">
                        <div class="empty-state-icon">📝</div>
                        <h3>No applications yet</h3>
                        <p>Start your journey by applying to your first remote gig!</p>
                        <a href="gigs.html" class="btn btn-primary">Browse Gigs</a>
                    </div>
                </li>
            `;
            return;
        }
        
        // Sort applications by date (newest first)
        allApplications.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
        
        // Display applications
        applicationsList.innerHTML = allApplications.map(app => createApplicationCard(app)).join('');
        
    } catch (error) {
        console.error('Error loading applications:', error);
        applicationsList.innerHTML = `
            <li class="application-item error">
                <div class="error-content">
                    <div class="error-icon">⚠️</div>
                    <h3>Error loading applications</h3>
                    <p>Please try refreshing the page.</p>
                </div>
            </li>
        `;
    }
}

function getApplicationsFromLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem('userApplications') || '[]');
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
}

async function getApplicationsFromFirebase() {
    try {
        // Get current user if authenticated
        const currentUser = auth.currentUser;
        if (!currentUser) {
            console.log('No authenticated user found');
            return [];
        }
        
        // Query Firestore for applications by this user
        const applicationsRef = collection(db, 'applications');
        const q = query(
            applicationsRef,
            where('userId', '==', currentUser.uid),
            orderBy('appliedAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        
        const applications = [];
        querySnapshot.forEach((doc) => {
            applications.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return applications;
    } catch (error) {
        console.error('Error fetching from Firebase:', error);
        return [];
    }
}

function mergeApplications(localApps, firebaseApps) {
    // Create a map to avoid duplicates
    const appMap = new Map();
    
    // Add local applications
    localApps.forEach(app => {
        appMap.set(app.id || `${app.email}_${app.appliedAt}`, app);
    });
    
    // Add Firebase applications (they would have different IDs)
    firebaseApps.forEach(app => {
        appMap.set(app.id, app);
    });
    
    return Array.from(appMap.values());
}

function createApplicationCard(application) {
    const appliedDate = new Date(application.appliedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const statusClass = getStatusClass(application.status);
    const statusText = getStatusText(application.status);
    
    return `
        <li class="application-item">
            <div class="application-header">
                <div class="application-title">
                    <h3>${application.jobTitle || 'Remote Position'}</h3>
                    <span class="application-date">Applied on ${appliedDate}</span>
                </div>
                <div class="application-status">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
            </div>
            
            <div class="application-details">
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">${application.fullName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${application.email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value">${application.phone}</span>
                </div>
                ${application.coverLetter ? `
                    <div class="detail-row">
                        <span class="detail-label">Cover Letter:</span>
                        <div class="detail-value cover-letter">
                            <p>${application.coverLetter}</p>
                        </div>
                    </div>
                ` : ''}
                ${application.cvUrl ? `
                    <div class="detail-row">
                        <span class="detail-label">CV:</span>
                        <span class="detail-value">
                            <a href="${application.cvUrl}" target="_blank" class="cv-link">
                                📄 View CV
                            </a>
                        </span>
                    </div>
                ` : ''}
            </div>
            
            <div class="application-actions">
                <button class="btn btn-secondary btn-small" onclick="viewApplicationDetails('${application.id}')">
                    View Details
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteApplication('${application.id}')">
                    Delete
                </button>
            </div>
        </li>
    `;
}

function getStatusClass(status) {
    switch (status) {
        case 'pending': return 'status-pending';
        case 'reviewed': return 'status-reviewed';
        case 'accepted': return 'status-accepted';
        case 'rejected': return 'status-rejected';
        default: return 'status-pending';
    }
}

function getStatusText(status) {
    switch (status) {
        case 'pending': return 'Pending Review';
        case 'reviewed': return 'Under Review';
        case 'accepted': return 'Accepted';
        case 'rejected': return 'Not Selected';
        default: return 'Pending Review';
    }
}

function viewApplicationDetails(applicationId) {
    // This could open a modal or navigate to a detailed view
    alert('Application details feature coming soon!');
}

async function deleteApplication(applicationId) {
    if (confirm('Are you sure you want to delete this application?')) {
        try {
            // Remove from localStorage
            let applications = getApplicationsFromLocalStorage();
            applications = applications.filter(app => app.id !== applicationId);
            localStorage.setItem('userApplications', JSON.stringify(applications));
            
            // Remove from Firebase
            try {
                await deleteDoc(doc(db, 'applications', applicationId));
                console.log('Application deleted from Firebase');
            } catch (firebaseError) {
                console.error('Error deleting from Firebase:', firebaseError);
                // Continue with local deletion even if Firebase fails
            }
            
            // Reload the applications list
            loadApplications();
            
            showNotification('Application deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting application:', error);
            showNotification('Error deleting application', 'error');
        }
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' ? 'background-color: #10b981;' : 'background-color: #ef4444;'}
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
} 