const fs = require('fs');
const path = require('path');

// Load taxonomy data to get college information
const loadTaxonomyData = () => {
  try {
    const filePath = path.join(__dirname, '../../data/taxonomy.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading taxonomy data:', error);
    return null;
  }
};

// Extract all colleges from taxonomy data
const extractColleges = () => {
  const taxonomy = loadTaxonomyData();
  if (!taxonomy) return [];

  const colleges = new Map();

  taxonomy.clusters.forEach(cluster => {
    cluster.groups.forEach(group => {
      group.occupations.forEach(occupation => {
        // Add JK colleges
        if (occupation.jk_colleges) {
          occupation.jk_colleges.forEach(college => {
            if (!colleges.has(college)) {
              colleges.set(college, {
                name: college,
                type: 'JK',
                programs: [],
                clusters: new Set()
              });
            }
            colleges.get(college).programs.push(occupation.title);
            colleges.get(college).clusters.add(cluster.name);
          });
        }

        // Add top colleges
        if (occupation.top_colleges) {
          occupation.top_colleges.forEach(college => {
            if (!colleges.has(college)) {
              colleges.set(college, {
                name: college,
                type: 'National',
                programs: [],
                clusters: new Set()
              });
            }
            colleges.get(college).programs.push(occupation.title);
            colleges.get(college).clusters.add(cluster.name);
          });
        }
      });
    });
  });

  // Convert Map to Array and format
  return Array.from(colleges.values()).map(college => ({
    name: college.name,
    type: college.type,
    programs: [...new Set(college.programs)],
    clusters: [...college.clusters],
    programCount: college.programs.length
  }));
};

// Get all colleges
const getAllColleges = (req, res) => {
  try {
    const colleges = extractColleges();
    
    res.json({
      success: true,
      data: {
        colleges,
        total: colleges.length
      }
    });
  } catch (error) {
    console.error('Error getting colleges:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get colleges by type
const getCollegesByType = (req, res) => {
  try {
    const { type } = req.params;
    const colleges = extractColleges();
    
    const filteredColleges = colleges.filter(college => 
      college.type.toLowerCase() === type.toLowerCase()
    );
    
    res.json({
      success: true,
      data: {
        colleges: filteredColleges,
        total: filteredColleges.length,
        type
      }
    });
  } catch (error) {
    console.error('Error getting colleges by type:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Search colleges
const searchColleges = (req, res) => {
  try {
    const { q, type, cluster, program } = req.query;
    const colleges = extractColleges();
    
    let filteredColleges = colleges;

    // Filter by type
    if (type) {
      filteredColleges = filteredColleges.filter(college => 
        college.type.toLowerCase() === type.toLowerCase()
      );
    }

    // Filter by cluster
    if (cluster) {
      filteredColleges = filteredColleges.filter(college => 
        college.clusters.some(c => 
          c.toLowerCase().includes(cluster.toLowerCase())
        )
      );
    }

    // Filter by program
    if (program) {
      filteredColleges = filteredColleges.filter(college => 
        college.programs.some(p => 
          p.toLowerCase().includes(program.toLowerCase())
        )
      );
    }

    // Search by name
    if (q) {
      const query = q.toLowerCase();
      filteredColleges = filteredColleges.filter(college => 
        college.name.toLowerCase().includes(query)
      );
    }

    res.json({
      success: true,
      data: {
        colleges: filteredColleges,
        total: filteredColleges.length
      }
    });
  } catch (error) {
    console.error('Error searching colleges:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get college details
const getCollegeDetails = (req, res) => {
  try {
    const { collegeName } = req.params;
    const colleges = extractColleges();
    
    const college = colleges.find(c => 
      c.name.toLowerCase() === collegeName.toLowerCase()
    );

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    // Get detailed information about programs offered
    const taxonomy = loadTaxonomyData();
    const detailedPrograms = [];

    if (taxonomy) {
      taxonomy.clusters.forEach(cluster => {
        cluster.groups.forEach(group => {
          group.occupations.forEach(occupation => {
            if (occupation.jk_colleges?.includes(college.name) || 
                occupation.top_colleges?.includes(college.name)) {
              detailedPrograms.push({
                title: occupation.title,
                code: occupation.code,
                cluster: cluster.name,
                group: group.group_name,
                skills_required: occupation.skills_required,
                education_path: occupation.education_path,
                exams_required: occupation.exams_required
              });
            }
          });
        });
      });
    }

    res.json({
      success: true,
      data: {
        ...college,
        detailedPrograms
      }
    });
  } catch (error) {
    console.error('Error getting college details:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getAllColleges,
  getCollegesByType,
  searchColleges,
  getCollegeDetails
};
