const complaintForm = document.getElementById('complaint-form');

const text = document.getElementById('text');
const name = document.getElementById('name');
const proof = document.getElementById('proof');

const submitBtn = document.getElementById('submit-btn');
const returnBtn = document.getElementById('return-btn');

complaintForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!window.isLink(proof.value)) {
        alert("Вставьте ссылку на скрин");
        return;
    }

    const data = {
        name: name.value.trim(),
        text: text.value.trim(),
        proof: proof.value.trim()
    };

    try {
        const result = await window.postFetch(`${window.API}/api/complaints`, data, submitBtn);

        if (result.success) {
            window.location.href = '/complaints/complaints.html';
        }
    } catch (error) {
        alert(error instanceof Error ? error.message : "Не удалось отправить жалобу");
    }
});