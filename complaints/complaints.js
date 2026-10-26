const complaintContainer = document.getElementById('complaintList');
const complaintTemplate = document.getElementById('complaint-template');

async function getComplaints() {
    complaintContainer.textContent = 'Загрузка..';

    try {
        const result = await window.getFetch(`${window.API}/api/complaints`);

        if (result.success) {
            const complaints = result.complaints;

            if (complaints <= 0) {
                complaintContainer.textContent = 'Жалоб нету';
            }

            complaints.forEach(complaint => {
                const clone = complaintTemplate.content.cloneNode(true);

                clone.querySelector('.complaint-name').textContent = 'Нарушитель: ' + complaint.name;
                clone.querySelector('.complaint-text').textContent = 'Что сделал: ' + complaint.text;

                const proof = clone.querySelector('.complaint-proof');
                proof.href = complaint.proof;
                proof.textContent = complaint.proof;

                const date = new Date(complaint.createdAt).toLocaleDateString("ru-RU");

                clone.querySelector('.complaint-created-at').textContent = 'Когда: ' + date;

                complaintContainer.textContent = '';
                complaintContainer.appendChild(clone);
            });
        }

    } catch(error) {
        console.error('Network error: ', error);
        complaintContainer.textContent = 'Не удалось загрузить жалобы';
    }
}

getComplaints();