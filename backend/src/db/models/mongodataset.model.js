module.exports = (mongoose) => {
    const datasetSchema = new mongoose.Schema({ 
        name: {
            type: String,
            required: true
        },
        languages: [String],
        url: String,
        createdAt: { 
            type: Date,
            default: Date.now
        },
        updatedAt: { 
            type: Date
        }
    });
    datasetSchema.pre('save', (next) =>{
        this.updatedAt = Date.now()
        next()
    })
    return mongoose.model('Dataset', datasetSchema);
}