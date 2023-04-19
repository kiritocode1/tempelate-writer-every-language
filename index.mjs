const res = `---
dependencies:
  - typescript :[ "5.0.1" , "required"]
  - tailwind : [ "2.0.1" , "optional"]
  - prisma : ["15.0.1" , "required"]
  - google Cloud sdk  ( as google )





component-details:
  name: PageName
  description: A simple component that displays a peep's name  and a button to contact him/her. 
  props:
    - name: String || null 
    - age : number ||null 
    - description: String || null 

assets : Null

states: 
- Flick  : false 

globals : 
- user : google.auth.user.data






Changes : 
    - nice_btn.onClick(() =>Flick = !Flick )
    - [Flick===true] : prisma.push({name + "matched with "+ $user})

  implementation:
    code: "
    <div>{name}</div>
    <h6>{age} </h6>
    <h6>{description} </h6>
    <button class="nice_btn">{Flick?'matched''Date me' }</button>
    "


---`
import * as dotenv from "dotenv";

dotenv.config();




import * as fs from "fs"; 

import { OpenAIApi , Configuration} from 'openai';



fs.mkdir('./results', { recursive: true }, (err) => {
    if (err) throw err;
});

// GET THIS KEY FROM : https://platform.openai.com/account/api-keys
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}); 

const openai = new OpenAIApi(config);



const list_of_frameworks_dot_files_like_dot_jsx = {
    react: ".tsx",
    vue: ".vue",
    angular: ".ts",
    svelte: ".svelte",
    backbone: ".js",
    nuxt: ".vue",

    sapper: ".svelte",
    solid: ".js",
    astro: ".astro",
    sveltekit: ".svelte",
    rocket: ".rs",
    qwik: ".tsx",

}; 



const logic = async ([ key, value ]) => {
    const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `make me a ${key + value} file with ${key}   framework and tempelate : 
        \n---\n
         ${res} 
         \n---\n
         in  the file and nothing else
         IMPORTANT : 
            - syntax
            - indentation
            - comments explaination
            - assume all packages are installed with import statements not require statements. 
            - types shoud be strict , if you dont know types , do standard language implementation (like js) 
            - semicolons are required . 
            -
         `,
        max_tokens: 3000,
        temperature: 0.1,
    });
    const file_resp = result.data.choices[ 0 ].text;

    fs.writeFile(`./results/${key}${value}`, file_resp, function (err) {
        if (err) throw err;
        console.log('Saved!', key, value);
    }
    );
}; 







    Object.entries(list_of_frameworks_dot_files_like_dot_jsx).forEach(async([ key, value ]) =>logic([ key, value ]));

