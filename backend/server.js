const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'storage.json');

app.use(cors());
app.use(express.json());

async function readData() {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/buckets', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.buckets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buckets' });
  }
});

app.post('/api/buckets', async (req, res) => {
  try {
    const data = await readData();
    const newBucket = {
      ...req.body,
      id: uuidv4(),
      storageSize: '5GB'
    };
    data.buckets.unshift(newBucket);
    await writeData(data);
    res.status(201).json(newBucket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create bucket' });
  }
});

app.delete('/api/buckets/:id', async (req, res) => {
  try {
    const data = await readData();
    const bucketIndex = data.buckets.findIndex(b => b.id === req.params.id);
    if (bucketIndex === -1) {
      return res.status(404).json({ error: 'Bucket not found' });
    }
    data.buckets.splice(bucketIndex, 1);

    data.files = data.files.filter(f => f.bucketId !== req.params.id);
    await writeData(data);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete bucket' });
  }
});

app.get('/api/buckets/:id', async (req, res) => {
  try {
    const data = await readData();
    const bucket = data.buckets.find(b => b.id === req.params.id);
    if (!bucket) {
      return res.status(404).json({ error: 'Bucket not found' });
    }
    res.json(bucket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bucket details' });
  }
});

app.get('/api/files', async (req, res) => {
  try {
    const data = await readData();
    const bucketId = req.query.bucketId;
    const files = bucketId 
      ? data.files.filter(f => f.bucketId === bucketId)
      : data.files;
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

app.post('/api/files', async (req, res) => {
  try {
    const data = await readData();
    const newFile = {
      ...req.body,
      id: uuidv4()
    };
    data.files.push(newFile);
    await writeData(data);
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.delete('/api/files/:id', async (req, res) => {
  try {
    const data = await readData();
    const fileIndex = data.files.findIndex(f => f.id === req.params.id);
    if (fileIndex === -1) {
      return res.status(404).json({ error: 'File not found' });
    }
    data.files.splice(fileIndex, 1);
    await writeData(data);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});