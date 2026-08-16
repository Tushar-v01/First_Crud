const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

const tasks = [
  { id: 1, title: 'Attend class', done: false },
  { id: 2, title: 'Complete A crud application',   done: true  },
  { id: 3, title: 'Go for a walk', done: false },
]

app.get('/',(req,res)=>{
  res.json({
    name:"Task API",
    version:"1.0",
    endpoints:["/tasks"]
  })
})
app.get("/task",(req,res)=>{
  res.send(tasks)
})

app.get("/task/:id",(req,res)=>{
  const id=Number(req.params.id)
  const task=tasks.find(item=>item.id===id)
  if(!task)
  {
    return res.status(404).json({ error: `Task ${id} not found`})
  }
  res.json(task)
})

app.get('/health',(req,res)=>{
  res.json({
    status:"ok"
  })
})

app.listen(port, () => {
  console.log(` listening on port ${port}`);
});
