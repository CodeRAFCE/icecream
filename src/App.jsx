import {useEffect, useState} from "react";
import CustomDropdown from "./components/CustomDropdown";
import AlertIcon from "./components/AlertIcon";

const SHEET_URL = `https://sheetdb.io/api/v1/qwtwehdqk2vy4`;

const COLOR_OPTIONS = [
	{color: "red", name: "RED", id: 1, icon: ""},
	{color: "orange", name: "ORANGE", id: 2, icon: ""},
	{color: "yellow", name: "YELLOW", id: 3, icon: ""},
	{color: "green", name: "GREEN", id: 4, icon: ""},
	{color: "blue", name: "BLUE", id: 5, icon: ""},
	{color: "indigo", name: "INDIGO", id: 6, icon: ""},
	{color: "violet", name: "VIOLET", id: 7, icon: ""},
];

function App() {
	const [sheetsData, setSheetsData] = useState();
	const [empId, setEmpId] = useState("");
	const [message, setMessage] = useState("");
	// const [uid, setUid] = useState();
	const [token, setToken] = useState();
	const [selectedColor, setSelectedColor] = useState("RED");
	const [duplicate, setDuplicate] = useState(false);
	// const [isSubmitted, setIsSubmitted] = useState(false);
	const [initialCount, setInitialCount] = useState(1); // Initial value for token

	const getSheetData = () => {
		fetch(SHEET_URL)
			.then((response) => response.json())
			.then((data) => setSheetsData(data));
	};

	useEffect(() => {
		const initialCountFromLocalStorage = Number(localStorage.getItem("COUNT"));
		if (initialCountFromLocalStorage) {
			setInitialCount(initialCountFromLocalStorage);
			setToken(initialCountFromLocalStorage); // Set token to initial value from localStorage
		} else {
			setToken(initialCount); // Set token to initial value 1
			localStorage.setItem("COUNT", initialCount); // Save initial count in localStorage
		}
		getSheetData();
	}, [initialCount]);

	// * --------------------------------------------------------
	// * FORM HANDLER METHODS

	// Function to reset form fields
	const resetForm = () => {
		console.log("RESET FORM");
		setEmpId("");
		setDuplicate(false);
		setSelectedColor("RED");
	};

	const onEmpIdChange = (event) => {
		const employeeId = event.target.value;
		setEmpId(employeeId);
	};

	// const onUidChange = (event) => {
	// 	const uniqueId = event.target.value;
	// 	setUid(uniqueId);
	// };

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check if empId exists in sheetsData
		const isEmpIdDuplicate = sheetsData?.some((entry) => entry?.employeeID === empId);

		console.log(isEmpIdDuplicate);

		if (isEmpIdDuplicate) {
			setMessage(
				"Employee ID already exists. Please Verify with the employee to resolve any issue."
			);
			return; // Do not proceed with form submission
		}

		// setIsSubmitted(true);

		// Increment token by 1
		const updatedToken = token + 1;

		// Update token state
		setToken(updatedToken);

		// Update token value in localStorage
		localStorage.setItem("COUNT", updatedToken);
		const isDuplicateYesOrNo = duplicate ? "yes" : "no";

		const data = {
			empId,
			// uid,
			isDuplicateYesOrNo,
			token,
			selectedColor,
		};

		if (!isEmpIdDuplicate) {
			fetch(SHEET_URL, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					employeeID: data.empId,
					colors: selectedColor,
					token: data.token,
					duplicates: data.isDuplicateYesOrNo,
				}),
			})
				.then((response) => {
					response.json();
					resetForm();
					getSheetData();
				})
				.then((data) => console.log(data));
		}
	};
	// * --------------------------------------------------------

	return (
		<>
			<header className="h-20 w-full mb-10">
				<nav className="max-w-7xl h-full mx-auto px-6 flex items-center justify-between">
					<div>LOGO1</div>
					<div>LOGO2</div>
				</nav>
			</header>

			<main className="max-w-7xl mx-auto px-6">
				<section>
					{message ? (
						<div className="my-6 flex items-center gap-3 justify-center bg-red-300 py-3 md:max-w-4xl md:mx-auto rounded-sm">
							<AlertIcon />
							<span className="text-lg font-semibold text-white">{message}</span>
						</div>
					) : null}

					<form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
						<div className="space-y-4">
							<fieldset>
								<label htmlFor="empId" className="font-semibold uppercase">
									Employee ID
								</label>
								<input
									name="empId"
									id="empId"
									type="text"
									value={empId}
									onChange={onEmpIdChange}
									placeholder="Enter Employee ID"
									className="border border-slate-500 focus:outline-none px-2 py-2 w-full rounded"
									required
								/>
							</fieldset>

							{/* ------------------------------------------------------------------ */}

							{/* <fieldset>
								<label htmlFor="uid" className="font-semibold uppercase">
									UID
								</label>
								<input
									name="uid"
									id="uid"
									type="text"
									onChange={onUidChange}
									placeholder="Enter a unique id"
									className="border border-slate-500 focus:outline-none px-2 py-2 w-full rounded"
									required
								/>
							</fieldset> */}

							<fieldset>
								<label htmlFor="colors" className="font-semibold uppercase">
									colors
								</label>

								<CustomDropdown
									options={COLOR_OPTIONS}
									onChange={setSelectedColor}
									resetValue={selectedColor}
								/>
							</fieldset>

							<fieldset className="flex items-center gap-2">
								<input
									type="checkbox"
									name="dups"
									id="dups"
									checked={duplicate}
									value={duplicate}
									onChange={() => setDuplicate(!duplicate)}
								/>
								<label htmlFor="dups">
									Only check if you have to create a duplicate entry in the sheet
								</label>
							</fieldset>
						</div>

						<div className="p-8 text-center bg-white border border-zinc-300 rounded my-10">
							<h1 className="text-2xl md:text-5xl font-semibold">TOKEN: {token || initialCount}</h1>
						</div>

						<div className="flex flex-row gap-3 justify-center">
							<button
								type="submit"
								className="uppercase px-6 py-2 bg-orange-400 text-white rounded"
							>
								Send
							</button>

							<a
								href="https://docs.google.com/spreadsheets/d/1_1elewbG74jJQStX2h6Hb-8uCC-0PpY9x5U3XEYjajg/edit#gid=0"
								className="uppercase px-6 py-2 bg-orange-400 text-white rounded"
								target="_blank"
								rel="noreferrer"
							>
								GO to SHEET
							</a>
						</div>
					</form>
				</section>
			</main>
		</>
	);
}

export default App;
