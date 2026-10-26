const form = document.getElementById("predictionForm");

const resultBox = document.getElementById("result");

const resultTitle = document.getElementById("resultTitle");

const resultText = document.getElementById("resultText");


form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const button = document.querySelector(".predict-btn");


    const data = {
        Age: Number(document.getElementById("age").value),
        Sex: Number(document.getElementById("sex").value),
        RestingBP: Number(document.getElementById("resting_bp").value),
        Cholesterol: Number(document.getElementById("cholesterol").value),
        FastingBS: Number(document.getElementById("fasting_bs").value),
        MaxHR: Number(document.getElementById("max_hr").value),
        ExerciseAngina: Number(
            document.getElementById("exercise_angina").value
        ),
        Oldpeak: Number(document.getElementById("oldpeak").value)
    };


    button.disabled = true;
    button.innerHTML = "Predicting...";


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/predict",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        // Check server error
        


        const result = await response.json();
        console.log("Api Response:" , result);
        console.log("status", response.status);

        console.log(result);
            if (!response.ok) {
            throw new Error(
                `Server error  
                ${response.status}:
                ${JSON.stringify(result)}`
                );
        }

        resultBox.classList.add("show");

        resultBox.classList.remove(
            "result-success",
            "result-danger",
            "result-error"
        );


        if (result.prediction === 1) {

            resultBox.classList.add("result-danger");

            resultTitle.innerHTML =
                "⚠️ Heart Disease Detected";

            resultText.innerHTML =
                `Prediction: ${result.result};`

        }

        else {

            resultBox.classList.add("result-success");

            resultTitle.innerHTML =
                "✓ No Heart Disease Detected";

            resultText.innerHTML =
                `Prediction: ${result.result};`

        }

    }

    catch (error) {

        console.error(error);

        resultBox.classList.add("show");

        resultBox.classList.remove(
            "result-success",
            "result-danger"
        );

        resultBox.classList.add("result-error");

        resultTitle.innerHTML =
            "⚠️ Connection Error";

        resultText.innerHTML =
            "Unable to connect to the FastAPI server.";

    }

    finally {

        button.disabled = false;

        button.innerHTML =
            "♥️ Predict Heart Disease";

    }

});