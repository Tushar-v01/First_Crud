const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

const tasks = [
  { id: 1, title: 'Attend class', done: false },
  { id: 2, title: 'Complete A crud application', done: true },
  { id: 3, title: 'Go for a walk', done: false },
]

app.get('/', (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"]
  })
})
app.get("/tasks", (req, res) => {
  res.send(tasks)
})

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id)
  const task = tasks.find(item => item.id === id)

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` })
  }

  res.json(task)
})

app.get('/health', (req, res) => {
  res.json({
    status: "ok"
  })
})


app.post('/tasks', (req, res) => {
  const { title } = req.body

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' })
  }

  const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1

  const newTask = {
    id,
    title: title.trim(),
    done: false,
  }

  tasks.push(newTask)

  res.status(201).json(newTask)
})

app.put('/tasks/:id', (req,res)=>{
  const id = Number(req.params.id)
  const task_index = tasks.findIndex(item =>
    item.id === id
)

  if (!task_index) {
    return res.status(404).json({ error: `Unknown ${id}` })
  }

  const { done } = req.body
  const title = req.body.title?.trim()
  if(!title || !done){
    console.log("4")
    return res.status(400).json({ error: 'Empty/Invalid body' })
  }
   if(title){
      tasks[task_index].title=title
  }
  if(done!==undefined )
  {
      tasks[task_index].title=title
  }
      res.status(200).json(tasks[task_index])
})

app.delete('/tasks/:id',(req,res)=>{
  const id = Number(req.params.id)
  const task_index = tasks.findIndex(item =>
    item.id === id
)

  if (task_index===-1) {
    return res.status(404).json({ error: `Unknown ${id}` })
  }

  tasks.splice(task_index,1);
  res.status(204).send()

  
})


app.listen(port, () => {
  console.log(` listening on port ${port}`);
});
