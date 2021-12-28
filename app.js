const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your Github Username. (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({confirmAbout}) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

const promptProject = portfolioData => {
  console.log(`
  =================
  Add a New Project
  =================
  `);

  // if there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer.prompt([
    {
    type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: projectInput => {
        if (projectInput) {
          return true;
        } else {
          console.log('Please enter the Project name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project. (Required)',
      validate: projectDescription => {
        if (projectDescription) {
          return true;
        } else {
          console.log('Please enter the Projects description!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: ' What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: githubLink => {
        if (githubLink) {
          return true;
        } else {
          console.log('Please provide the GitHub link!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

// TOOL: used to test data
// const mockData = {
  // name: 'Faissal ',
  // github: 'Jiryeah',
  // confirmAbout: true,
  // about: 'aklsdfjakl;sdfja;skldfjas;lkdfjas;lkdfjas;ldkfjas;ldkfjaslkdfjas;dlkfjasl;kdfjas;lkdfjas;dlkfjas;dlkfjasd;klfjasd;lkfjas;kldfjasl;kdfjas;kldfjas;lkdfjas;dlkfjasd;lkfjas;dlkfjas;dlkfjas;dlkfjasd;klfjasd;lkfjasd;lkfjasdl;kfjaskl;dfjas;dklfjas;dlkfjas;lkdfjas;lkdfjas;lkdfjas;lkdfjas;lkdfjas;lkdfjas;lkdfjas;lkdfjas;ldkfjasd;lkfjasdlk;fjasdkl;fjasd;lkfjasd;lkfjasd;lkfjasdlk;fja;sldkfjasd;lkfjasd;lkfjas;dlkfjas;ldkfjasd;lfkjasd;lfkjasd;flkajsdf;lkasjdfas;lkdfjas;dlkfjas;dklfjas;dlkfjas;dlfkj;akl',
  // projects: [
  //   {
  //     name: 'Test 1',
  //     description: 'test run to see if the function operates correctly.',
  //     languages: [Array],
  //     link: 'https://github.com/lernantion/test-1',
  //     feature: true,
  //     confirmAddProject: true
  //   },
  //   {
  //     name: 'Test 2',
  //     description: 'test run to see if the second project is successfully added to the object. ',
  //     languages: [Array],
  //     link: 'https://github.com/Jiryeah/Test-2',
  //     feature: true,
  //     confirmAddProject: false
  //   }
  // ]
// }

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
    
    // fs.writeFile('./index.html', pageHTML, err => {
    //   if (err) throw new Error(err);

    //   console.log('Page crated! Check out index.html in this directory to see it!');
    // })
  });




























// const printProfileData = profileDataArr => {
  // This...
//   for (let i = 0; i < profileDataArr.length; i++) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('================');

  // Is the same as this...
//   profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);