document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const responseMessage = document.getElementById('responseMessage');
    const fileNameDisplay = document.getElementById('fileName');

    // Handle form submission
    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData();
        if (fileInput.files.length > 0) {
            formData.append('fileupload', fileInput.files[0]); // Append the selected file

            fetch('https://multervijaynimar.onrender.com/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Backend Response:', data);
                if (data.error) {
                    responseMessage.textContent = 'Error: ' + data.error;
                } else {
                    responseMessage.textContent = 'File uploaded successfully';
                    fetchFiles(); // Fetch and display all files
                }
            })
            .catch(error => {
                console.error('Error:', error);
                responseMessage.textContent = 'Network error: ' + error;
            });
        } else {
            responseMessage.textContent = 'Please select a file to upload.';
        }
    });

    // Function to fetch and display all files
    function fetchFiles() {
        fetch('https://multervijaynimar.onrender.com/files') // Assuming this endpoint returns the list of files
            .then(response => response.json())
            .then(data => {
                console.log('Files List:', data);
                if (Array.isArray(data) && data.length > 0) {
                    fileNameDisplay.innerHTML = data.map(file => `<div>${file}</div>`).join('');
                } else {
                    fileNameDisplay.textContent = 'No files uploaded yet.';
                }
            })
            .catch(error => {
                console.error('Error fetching files:', error);
                fileNameDisplay.textContent = 'Error fetching files.';
            });
    }

    // Initial fetch to display files on page load
    fetchFiles();
});

