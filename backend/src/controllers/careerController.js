const fs = require('fs');
const path = require('path');

// Load taxonomy data
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

// Get all career clusters
const getCareerClusters = (req, res) => {
  try {
    const taxonomy = loadTaxonomyData();
    
    if (!taxonomy) {
      return res.status(404).json({
        success: false,
        message: 'Career data not found'
      });
    }

    const clusters = taxonomy.clusters.map(cluster => ({
      name: cluster.name,
      groups: cluster.groups.map(group => ({
        name: group.group_name,
        occupationCount: group.occupations.length
      }))
    }));

    res.json({
      success: true,
      data: clusters
    });
  } catch (error) {
    console.error('Error getting career clusters:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get careers by cluster
const getCareersByCluster = (req, res) => {
  try {
    const { clusterName } = req.params;
    const taxonomy = loadTaxonomyData();
    
    if (!taxonomy) {
      return res.status(404).json({
        success: false,
        message: 'Career data not found'
      });
    }

    const cluster = taxonomy.clusters.find(c => 
      c.name.toLowerCase() === clusterName.toLowerCase()
    );

    if (!cluster) {
      return res.status(404).json({
        success: false,
        message: 'Cluster not found'
      });
    }

    const careers = cluster.groups.flatMap(group => 
      group.occupations.map(occupation => ({
        ...occupation,
        group: group.group_name,
        cluster: cluster.name
      }))
    );

    res.json({
      success: true,
      data: {
        cluster: cluster.name,
        careers
      }
    });
  } catch (error) {
    console.error('Error getting careers by cluster:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get specific career details
const getCareerDetails = (req, res) => {
  try {
    const { careerCode } = req.params;
    const taxonomy = loadTaxonomyData();
    
    if (!taxonomy) {
      return res.status(404).json({
        success: false,
        message: 'Career data not found'
      });
    }

    let career = null;
    let cluster = null;
    let group = null;

    // Search for the career across all clusters
    for (const c of taxonomy.clusters) {
      for (const g of c.groups) {
        const occupation = g.occupations.find(occ => occ.code === careerCode);
        if (occupation) {
          career = occupation;
          cluster = c.name;
          group = g.group_name;
          break;
        }
      }
      if (career) break;
    }

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career not found'
      });
    }

    res.json({
      success: true,
      data: {
        ...career,
        cluster,
        group
      }
    });
  } catch (error) {
    console.error('Error getting career details:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Search careers
const searchCareers = (req, res) => {
  try {
    const { q, cluster, group, skills } = req.query;
    const taxonomy = loadTaxonomyData();
    
    if (!taxonomy) {
      return res.status(404).json({
        success: false,
        message: 'Career data not found'
      });
    }

    let careers = [];

    // Get all careers
    taxonomy.clusters.forEach(c => {
      c.groups.forEach(g => {
        g.occupations.forEach(occupation => {
          careers.push({
            ...occupation,
            cluster: c.name,
            group: g.group_name
          });
        });
      });
    });

    // Apply filters
    if (cluster) {
      careers = careers.filter(c => 
        c.cluster.toLowerCase().includes(cluster.toLowerCase())
      );
    }

    if (group) {
      careers = careers.filter(c => 
        c.group.toLowerCase().includes(group.toLowerCase())
      );
    }

    if (skills) {
      const skillArray = skills.split(',').map(s => s.trim().toLowerCase());
      careers = careers.filter(c => {
        if (!c.skills_required) return false;
        return c.skills_required.some(skill => 
          skillArray.some(searchSkill => 
            skill.toLowerCase().includes(searchSkill)
          )
        );
      });
    }

    if (q) {
      const query = q.toLowerCase();
      careers = careers.filter(c => 
        c.title.toLowerCase().includes(query) ||
        (c.skills_required && c.skills_required.some(skill => 
          skill.toLowerCase().includes(query)
        ))
      );
    }

    res.json({
      success: true,
      data: {
        careers,
        total: careers.length
      }
    });
  } catch (error) {
    console.error('Error searching careers:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getCareerClusters,
  getCareersByCluster,
  getCareerDetails,
  searchCareers
};
