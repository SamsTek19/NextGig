// Application form handling - This will be initialized by the Firebase module script

async function handleApplicationSubmit(event) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    try {
        // Get form data
        const formData = new FormData(event.target);
        const applicationData = {
            fullName: formData.get('full-name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            coverLetter: formData.get('cover-letter'),
            cvFile: formData.get('cv'),
            jobTitle: getJobTitleFromURL(), // You can modify this based on your needs
            appliedAt: new Date().toISOString(),
            status: 'pending'
        };
        
        // Upload CV file to Firebase Storage
        let cvUrl = '';
        if (applicationData.cvFile && applicationData.cvFile.size > 0) {
            cvUrl = await uploadCVToStorage(applicationData.cvFile, applicationData.email);
        }
        
        // Save application data to Firestore
        const applicationId = await saveApplicationToFirestore({
            ...applicationData,
            cvUrl: cvUrl
        });
        
        // Save to local storage for "My Applications" page
        saveApplicationToLocalStorage({
            id: applicationId,
            ...applicationData,
            cvUrl: cvUrl
        });
        
        // Show success message
        showNotification('Application submitted successfully!', 'success');
        
        // Reset form
        event.target.reset();
        
        // Redirect to applications page after a short delay
        setTimeout(() => {
            window.location.href = 'applications.html';
        }, 2000);
        
    } catch (error) {
        console.error('Error submitting application:', error);
        showNotification('Error submitting application. Please try again.', 'error');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

async function uploadCVToStorage(file, userEmail) {
    try {
        const fileName = `cv_${userEmail}_${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `applications/${fileName}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading CV:', error);
        throw new Error('Failed to upload CV file');
    }
}

async function saveApplicationToFirestore(applicationData) {
    try {
        // Get current user if authenticated
        const currentUser = auth.currentUser;
        const userId = currentUser ? currentUser.uid : null;
        
        // Add user information to application data
        const applicationWithUser = {
            ...applicationData,
            userId: userId,
            userName: currentUser ? currentUser.displayName : applicationData.fullName,
            userEmail: currentUser ? currentUser.email : applicationData.email
        };
        
        const docRef = await addDoc(collection(db, 'applications'), applicationWithUser);
        return docRef.id;
    } catch (error) {
        console.error('Error saving to Firestore:', error);
        throw new Error('Failed to save application data');
    }
}

function saveApplicationToLocalStorage(applicationData) {
    try {
        let applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
        applications.push(applicationData);
        localStorage.setItem('userApplications', JSON.stringify(applications));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function getJobTitleFromURL() {
    // Extract job title from URL parameters or use a default
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('jobTitle') || 'Remote Position';
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