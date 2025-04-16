const form = document.getElementById('quizForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // stop page from refreshing
    console.log("button submitted");

    let poodleCount = 0;
    let goldenCount = 0;
    let corgiCount = 0;

    const questionNames = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];

    for (let i = 0; i < questionNames.length; i++) {
        const selected = document.querySelector(`input[name="${questionNames[i]}"]:checked`);
        console.log(selected);

        if (selected) {
            if (selected.value === 'poodle') {
                poodleCount++;
            } else if (selected.value === 'golden') {
                goldenCount++;
            } else if (selected.value === 'corgi') {
                corgiCount++;
            }
        }
    }

    let resultText = "";
    let resultPage = "";

    if (poodleCount >= goldenCount && poodleCount >= corgiCount) {
        resultText = "🐩 You are best matched with a Poodle! Elegant, clever, and allergy-friendly.";
        resultPage = "poodle.html";
    } else if (goldenCount >= poodleCount && goldenCount >= corgiCount) {
        resultText = "🐕 You are best matched with a Golden Retriever! Loyal, kind, and always up for fun.";
        resultPage = "golden.html";
    } else {
        resultText = "🐾 You are best matched with a Corgi! Compact, energetic, and full of personality.";
        resultPage = "corgi.html";
    }

    // Show result on page
    resultDiv.innerHTML = resultText;

    console.log(`Poodle: ${poodleCount}`);
    console.log(`Golden: ${goldenCount}`);
    console.log(`Corgi: ${corgiCount}`);

    // Redirect after short delay
    setTimeout(() => {
        window.location.href = resultPage;
    }, 2000); // 2 second delay before redirect
});
