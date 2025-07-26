// Main JavaScript for Figma Test Case Generator

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    checkApiStatus();
    setupEventListeners();
});

function setupEventListeners() {
    // Form submission
    document.getElementById('generation-form').addEventListener('submit', handleFormSubmit);
    
    // Mode change handler
    document.querySelectorAll('input[name="mode"]').forEach(radio => {
        radio.addEventListener('change', handleModeChange);
    });
    
    // Copy button
    document.getElementById('copy-btn').addEventListener('click', copyTestCases);
}

function handleModeChange() {
    const aiMode = document.getElementById('mode-ai').checked;
    const instructionsDiv = document.getElementById('ai-instructions');
    
    if (aiMode) {
        instructionsDiv.style.display = 'block';
    } else {
        instructionsDiv.style.display = 'none';
    }
}

function checkApiStatus() {
    fetch('/health')
        .then(response => response.json())
        .then(data => {
            const statusDiv = document.getElementById('api-status');
            if (data.status === 'healthy') {
                statusDiv.innerHTML = `
                    <div class="d-flex align-items-center text-success">
                        <i class="fas fa-check-circle me-2"></i>
                        <strong>APIs Ready</strong>
                        <span class="ms-3 small">
                            Figma: ${data.figma_configured ? 'Configured' : 'Demo Mode'} | 
                            Mistral: ${data.mistral_configured ? 'Configured' : 'Demo Mode'}
                        </span>
                    </div>
                `;
            } else {
                statusDiv.innerHTML = `
                    <div class="d-flex align-items-center text-warning">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        <strong>API Issues Detected</strong>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Health check failed:', error);
            document.getElementById('api-status').innerHTML = `
                <div class="d-flex align-items-center text-danger">
                    <i class="fas fa-times-circle me-2"></i>
                    <strong>Unable to check API status</strong>
                </div>
            `;
        });
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const fileKey = document.getElementById('file-key').value.trim();
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const instructions = document.getElementById('instructions').value.trim();
    
    if (!fileKey) {
        showError('Please enter a Figma file key');
        return;
    }
    
    // Hide previous results and errors
    hideResults();
    hideError();
    
    // Show progress
    showProgress('Connecting to Figma API...');
    
    // Prepare request data
    const requestData = {
        file_key: fileKey,
        mode: mode,
        instructions: instructions
    };
    
    // Make the API call
    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.error || 'Generation failed');
            });
        }
        return response.json();
    })
    .then(data => {
        hideProgress();
        if (data.success) {
            showResults(data);
        } else {
            showError(data.error || 'Unknown error occurred');
        }
    })
    .catch(error => {
        hideProgress();
        console.error('Generation error:', error);
        showError(error.message || 'Failed to generate test cases');
    });
}

function showProgress(message) {
    const progressSection = document.getElementById('progress-section');
    const progressText = document.getElementById('progress-text');
    const progressBar = document.querySelector('.progress-bar');
    
    progressText.textContent = message;
    progressSection.style.display = 'block';
    
    // Animate progress bar
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        progressBar.style.width = progress + '%';
    }, 500);
    
    // Store interval for cleanup
    progressSection.dataset.interval = interval;
}

function hideProgress() {
    const progressSection = document.getElementById('progress-section');
    const interval = progressSection.dataset.interval;
    
    if (interval) {
        clearInterval(parseInt(interval));
    }
    
    progressSection.style.display = 'none';
    
    // Reset progress bar
    document.querySelector('.progress-bar').style.width = '0%';
}

function showResults(data) {
    const resultsSection = document.getElementById('results-section');
    const fileInfo = document.getElementById('file-info');
    const elementsPreview = document.getElementById('elements-preview');
    const testCasesOutput = document.getElementById('test-cases-output');
    
    // Display file information
    fileInfo.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <strong>File:</strong> ${data.file_name}
            </div>
            <div class="col-md-3">
                <strong>Elements:</strong> ${data.total_elements}
            </div>
            <div class="col-md-3">
                <strong>Mode:</strong> ${data.mode.charAt(0).toUpperCase() + data.mode.slice(1)}
            </div>
        </div>
    `;
    
    // Display elements preview
    if (data.elements && data.elements.length > 0) {
        const elementsHtml = data.elements.map(elem => `
            <span class="badge bg-secondary me-1 mb-1">
                ${elem.name} (${elem.coordinates})
            </span>
        `).join('');
        
        elementsPreview.innerHTML = `
            <div class="mb-2">
                <strong>UI Elements Found:</strong>
            </div>
            <div>${elementsHtml}</div>
        `;
    } else {
        elementsPreview.innerHTML = '<em class="text-muted">No interactive elements detected</em>';
    }
    
    // Display test cases
    testCasesOutput.textContent = data.test_cases;
    
    resultsSection.style.display = 'block';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideResults() {
    document.getElementById('results-section').style.display = 'none';
}

function showError(message) {
    const errorSection = document.getElementById('error-section');
    const errorMessage = document.getElementById('error-message');
    
    errorMessage.textContent = message;
    errorSection.style.display = 'block';
    
    // Scroll to error
    errorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideError() {
    document.getElementById('error-section').style.display = 'none';
}

function copyTestCases() {
    const testCasesOutput = document.getElementById('test-cases-output');
    const text = testCasesOutput.textContent;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback();
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showCopyFeedback();
}

function showCopyFeedback() {
    const copyBtn = document.getElementById('copy-btn');
    const originalText = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '<i class="fas fa-check me-1"></i>Copied!';
    copyBtn.classList.add('btn-success');
    copyBtn.classList.remove('btn-outline-secondary');
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.classList.remove('btn-success');
        copyBtn.classList.add('btn-outline-secondary');
    }, 2000);
}
