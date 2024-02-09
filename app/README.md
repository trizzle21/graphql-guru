# Installation
_This was tested with Node 20, this may work with other versions of node, but can't be guaranteed. If you have a node version manager (nvm/nodenv) to switch to 20 for best results_

After cloning run
```
yarn install
```

## Adding env keys
You will be told where to find the appropriate API key and org id at the event. To add them to this project, copy the example environment file and add your keys
```
cp .env.example .env
```

## Setting up Python
_This was tested with Python 3.11, this may work with other versions of Python, but can't be guaranteed. If you have a pyenv to switch to 3.11 for best results_

You will need version 3.9+ of python for this project.

In a different shell window from the front-end, you'
```shell
>>> cd api
>>> python3 -m venv venv
>>> source venv/bin/activate
>>> pip install -r requirements.txt
>>> cd ..
>>> yarn start-api
```

## Running the Frontend

To install the FE dependencies run:
```
yarn install
```

To start the application in Development mode, 
```
yarn start
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start-api`

This runs the python backend webservice that backs the graphql api

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
