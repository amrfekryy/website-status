This is an application with a simple signup/login system that enables users to Add/Edit/Delete their websites and check for their status whether they are currently Up or Down!

### Technologies Used
- `Reactjs` client, and `Flask` server with RESTfull API
- `SQLAlchemy` ORM connected to a `SQLite` database
- `react-bootstrap` for UI components
- `axios` for requests, and `lodash` for data operations

### Database
- A database `db.sqlite3` is attached in the repo with sample data to start with. If you'd like a fresh database just remove the existing one, and a new one will be created automatically upon running server.

### Run Server
- `cd server` 
- Optional: create virtual environment and activate it:
  - `py -3 -m venv venv` then `source ./venv/Scripts/activate`
- install packages: `pip install -r requirements.txt`
- development environment: `export FLASK_ENV=development` and `export FLASK_DEBUG=1`
- run server on port 5000 (must): `flask run --port=5000`

### Run Client
- install packages: `cd client` then `npm install`
- run client: `npm start`
- go to `http://localhost:3000` in your browser

### Areas to improve
- Schedule server events to consistently check status for all websites in the database.
- Record "website down" incidents.
- Create a new section/page for incident history and group data by date or website.
- Add validations for form inputs.
- Display feedback messages and improve user experience.
